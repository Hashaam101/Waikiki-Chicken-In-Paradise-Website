// app/blogs/createblog/page.tsx
'use client';

import { useState, ChangeEvent, useRef, useEffect } from 'react';
import Image from 'next/image'; // Import Image for preview
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { JSONContent } from '@tiptap/react';

import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore'; 
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, uploadString, deleteObject as deleteStorageObject } from 'firebase/storage'; 
import { useRouter } from 'next/navigation';
import { convertFileToBase64 } from '@/lib/tiptap-utils'; 
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/Spinner'; 


const CreateBlogPage = () => {
  const router = useRouter();
  const storage = getStorage(); 

  const [title, setTitle] = useState<string>('');
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  
  const [coverImageBase64, setCoverImageBase64] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [videoUploading, setVideoUploading] = useState<boolean>(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0);
  const [videoDownloadURL, setVideoDownloadURL] = useState<string | null>(null);
  const [videoStoragePath, setVideoStoragePath] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [postArchived, setPostArchived] = useState(false); 

  const {loading, user} = useAuth();

  const formRef = useRef<HTMLFormElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error || successMessage || videoError) {
      timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
        setVideoError(null);
      }, 7000); 
    }
    return () => clearTimeout(timer);
  }, [error, successMessage, videoError]);

  const handleContentChange = (content: JSONContent) => {
    setEditorContent(content);
  };

  const handleCoverImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setError(null); setSuccessMessage(null);
    setCoverImageBase64(null); setImagePreview(null); setCoverImageFile(null);

    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setError("Invalid file type. Please select an image for the cover.");
        if(coverImageInputRef.current) coverImageInputRef.current.value = "";
        return;
      }
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        setError(`Cover image size exceeds ${MAX_SIZE / (1024 * 1024)}MB.`);
        if(coverImageInputRef.current) coverImageInputRef.current.value = "";
        return;
      }
      setCoverImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      try {
        const base64 = await convertFileToBase64(file);
        setCoverImageBase64(base64);
      } catch (err) {
        console.error("Error converting cover image to Base64:", err);
        setError(err instanceof Error ? `Error processing cover image: ${err.message}` : "Unknown error processing cover image.");
        setImagePreview(null); setCoverImageFile(null);
        if(coverImageInputRef.current) coverImageInputRef.current.value = "";
      }
    }
  };

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoError(null); setError(null); setSuccessMessage(null);
    setVideoDownloadURL(null); setVideoStoragePath(null); 
    setVideoUploadProgress(0); setVideoFile(null); setVideoPreviewUrl(null);

    const files = event.target.files;
    if (files && files[0]) {
        const file = files[0];
        if (!file.type.startsWith("video/")) {
            setVideoError("Invalid file type. Please select a video (e.g., MP4, WebM).");
            if(videoInputRef.current) videoInputRef.current.value = "";
            return;
        }
        const MAX_SIZE = 50 * 1024 * 1024; // 50MB
        if (file.size > MAX_SIZE) {
            setVideoError(`Video file size exceeds ${MAX_SIZE / (1024 * 1024)}MB.`);
            if(videoInputRef.current) videoInputRef.current.value = "";
            return;
        }
        setVideoFile(file);
        const objectUrl = URL.createObjectURL(file);
        setVideoPreviewUrl(objectUrl);
        uploadVideo(file); 
    }
  };

  const uploadVideo = async (file: File) => {
    const restaurantId = process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID;
    if (!restaurantId) { 
        setVideoError("Restaurant ID is not configured. Cannot upload video.");
        setVideoUploading(false); 
        return;
    }

    setVideoUploading(true);
    setVideoUploadProgress(0);

    // For a new blog, the blog ID isn't known yet for a perfectly structured path.
    // We'll use a temporary-like structure or one based on user and timestamp.
    // This path will be stored in Firestore alongside the video URL.
    const tempBlogIdentifier = `new_blog_video_${user?.uid || 'anon'}_${Date.now()}`;
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const videoPath = `restaurant_assets/${restaurantId}/blog_videos/${tempBlogIdentifier}/${fileName}`;
    
    const fileRef = storageRef(storage, videoPath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setVideoUploadProgress(progress);
        },
        (error) => {
            console.error("Video upload error:", error);
            setVideoError(`Upload failed: ${error.message}`);
            setVideoUploading(false);
            setVideoFile(null); setVideoPreviewUrl(null);
            if(videoInputRef.current) videoInputRef.current.value = "";
        },
        async () => {
            try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setVideoDownloadURL(downloadURL);
                setVideoStoragePath(uploadTask.snapshot.ref.fullPath); // Save the full storage path
                setVideoUploading(false);
                setSuccessMessage("Video uploaded. Save post to finalize.");
            } catch (uploadError) {
                console.error("Error getting download URL:", uploadError);
                setVideoError("Upload succeeded but failed to get URL.");
                setVideoUploading(false);
            }
        }
    );
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccessMessage(null);

    if (!title.trim()) { setError('Title is required.'); return; }
    const isEmptyContent = !editorContent || !editorContent.content ||
                           (editorContent.content.length === 1 &&
                            editorContent.content[0].type === 'paragraph' &&
                            (!editorContent.content[0].content || editorContent.content[0].content.length === 0));
    if (isEmptyContent) { setError('Blog content cannot be empty.'); return; }
    if (!coverImageBase64) { setError('Cover image is required.'); return; }
    if (videoUploading) { setError("Please wait for video upload to complete."); return;}


    setIsPublishing(true);
    let createdBlogDocId: string | null = null; 
    let uploadedContentStoragePath: string | null = null;


    try {
      const restaurantId = process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID;
      if (!restaurantId) {
        throw new Error("Restaurant ID is not configured. Check environment variables.");
      }

      const blogPostData: any = {
        title: title,
        archived: postArchived, 
        coverImage: coverImageBase64,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (videoDownloadURL && videoStoragePath) {
        blogPostData.videoUrl = videoDownloadURL;
        blogPostData.videoStoragePath = videoStoragePath;
      }
      
      const blogDocRef = await addDoc(collection(db, `Restaurants/${restaurantId}/blogs`), blogPostData);
      createdBlogDocId = blogDocRef.id; 
      
      const contentToSaveString = editorContent ? JSON.stringify(editorContent) : JSON.stringify({type: "doc", content: []});
      const contentFileName = `content.json`; 
      const contentPath = `restaurant_assets/${restaurantId}/blog_content/${createdBlogDocId}/${contentFileName}`;
      uploadedContentStoragePath = contentPath; 

      const contentFileRef = storageRef(storage, contentPath);
      await uploadString(contentFileRef, contentToSaveString, 'raw', { contentType: 'application/json'});

      await updateDoc(doc(db, `Restaurants/${restaurantId}/blogs`, createdBlogDocId), { 
        contentStoragePath: contentPath 
      });

      setSuccessMessage("Blog post published successfully!");
      
      // Clear form
      setTitle('');
      setEditorContent(null);
      setCoverImageBase64(null); setCoverImageFile(null); setImagePreview(null);
      setVideoFile(null); setVideoPreviewUrl(null); setVideoDownloadURL(null); setVideoStoragePath(null); setVideoUploadProgress(0);
      if (formRef.current) formRef.current.reset();
      if (coverImageInputRef.current) coverImageInputRef.current.value = "";
      if (videoInputRef.current) videoInputRef.current.value = "";

    } catch (err) {
      console.error("Error during publishing process: ", err);
      const publishError = err instanceof Error ? `Failed to publish post: ${err.message}` : "An unknown error occurred during publishing.";
      setError(publishError);

      if (createdBlogDocId && process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID) {
        const currentRestaurantId = process.env.NEXT_PUBLIC_FIREBASE_RESTAURANT_ID;
        console.warn(`Attempting to roll back blog creation for ID: ${createdBlogDocId}`);
        try {
          // Delete main blog document
          await deleteDoc(doc(db, `Restaurants/${currentRestaurantId}/blogs`, createdBlogDocId));
          console.log(`Successfully rolled back (deleted) blog document: ${createdBlogDocId}`);
          setError(`${publishError} (Blog document creation was rolled back.)`);

          // Attempt to delete uploaded content.json from Storage if its path was set
          if (uploadedContentStoragePath) {
            console.warn(`Attempting to roll back content JSON from Storage: ${uploadedContentStoragePath}`);
            const contentToDeleteRef = storageRef(storage, uploadedContentStoragePath);
            await deleteStorageObject(contentToDeleteRef).then(() => {
                console.log("Successfully deleted content JSON from storage during rollback.");
            }).catch((storageDeleteError) => {
                console.error("Failed to delete content JSON from storage during rollback:", storageDeleteError);
                setError(prev => `${prev} Failed to delete content file from storage.`);
            });
          }
          // Note: Deleting the uploaded video (if any) during rollback is not yet implemented here.
          // If video was uploaded successfully and then blog creation failed, that video might remain.
          // This could be added if necessary by checking videoStoragePath.

        } catch (rollbackError) {
          console.error(`Failed to roll back blog document for ID: ${createdBlogDocId}`, rollbackError);
          setError(`${publishError} (Additionally, failed to roll back blog document. Please check Firestore & Storage.)`);
        }
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const initialEditorContent: JSONContent = {
    type: 'doc',
    content: [ { type: 'paragraph', content: [ { type: 'text', text: 'Start writing your blog post here...' } ] } ],
  };

  if (loading) { return <div className="flex justify-center items-center h-screen"><Spinner/></div>; }
  if (!user && !loading) { router.push('/login'); return null; }


  return (
      <div className="p-4 md:p-8 font-creto h-screen overflow-auto flex flex-col bg-gray-50 no-scrollbar">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Create New Blog Post</h1>

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded fixed right-10 top-20 z-50 mb-4 shadow-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
                <button onClick={() => setError(null)} className="px-4 text-red-700">
                    <span className="text-2xl">&times;</span>
                </button>
            </div>
        )}

        {isPublishing && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded fixed right-10 top-20 z-50 mb-4 shadow-lg" role="alert">
                <strong className="font-bold">Publishing Blog... </strong>
            </div>
        )}

        {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded fixed right-10 top-20 z-50 mb-4 shadow-lg" role="alert">
                <strong className="font-bold">Success: </strong>
                <span className="block sm:inline">{successMessage}</span>
                 <button onClick={() => setSuccessMessage(null)} className="px-4 text-green-700">
                    <span className="text-2xl">&times;</span>
                </button>
            </div>
        )}
        {videoError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded fixed right-10 top-32 z-50 mb-4 shadow-lg" role="alert">
                <strong className="font-bold">Video Error: </strong>
                <span className="block sm:inline">{videoError}</span>
                <button onClick={() => setVideoError(null)} className="px-4 text-red-700">
                    <span className="text-2xl">&times;</span>
                </button>
            </div>
        )}

        <form ref={formRef} onSubmit={handlePublish} className="mx-auto w-full max-w-4xl flex flex-col flex-grow">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
                {/* Column 1 */}
                <div>
                    <div className="mb-6">
                        <label htmlFor="blogTitle" className="block text-lg font-medium text-gray-700 mb-2">Blog Title</label>
                        <input
                            type="text" id="blogTitle" value={title} onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your blog title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center gap-x-3">
                        <input
                            type="checkbox" id="archive" checked={postArchived} 
                            onChange={(e => setPostArchived(e.target.checked))}
                            className="w-5 h-5 accent-primary text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="archive" className="text-lg font-medium text-gray-700">Archive Post</label>
                    </div>
                </div>
                {/* Column 2 */}
                <div className="mb-6">
                    <label htmlFor="coverImage" className="block text-lg font-medium text-gray-700 mb-2">Cover Image</label>
                    <input
                        type="file" id="coverImage" accept="image/*" onChange={handleCoverImageChange} ref={coverImageInputRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 file:mr-2 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary-dark hover:file:text-white"
                        required
                    />
                    {imagePreview && (
                        <div className="mt-3">
                            <Image src={imagePreview} alt="Cover preview" width={160} height={90} className="rounded-md border border-gray-300 object-cover max-h-24 w-auto" />
                        </div>
                    )}
                </div>
            </div>

            {/* Video Upload Section - Full Width */}
            <div className="mb-6">
                <label htmlFor="blogVideo" className="block text-lg font-medium text-gray-700 mb-2">Blog Video (Optional)</label>
                <input
                    type="file" id="blogVideo" accept="video/*" onChange={handleVideoChange} ref={videoInputRef}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 file:mr-2 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {videoUploading && (
                    <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${videoUploadProgress}%` }}></div>
                        </div>
                        <p className="text-xs text-center text-gray-600 mt-1">{Math.round(videoUploadProgress)}% uploaded</p>
                    </div>
                )}
                {videoPreviewUrl && !videoUploading && (
                    <div className="mt-3">
                        <video src={videoPreviewUrl} controls width="320" className="rounded-md border border-gray-300 max-h-48 w-auto">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
                {videoDownloadURL && !videoUploading && (
                    <p className="mt-1 text-xs text-green-600">Video ready. Save post to apply.</p>
                )}
            </div>

            <div className="mb-6 flex-grow flex flex-col h-full p-4 md:p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                <label className="block text-lg font-medium text-gray-700 mb-2">Blog Content</label>
                <div className='min-h-[300px] md:min-h-[400px] no-scrollbar tiptap-editor-container'>
                    <SimpleEditor
                        key={editorContent ? 'editor-with-content' : 'editor-empty'}
                        initialContent={editorContent || initialEditorContent}
                        onContentChange={handleContentChange}
                    />
                </div>
            </div>
        </form>

        <div className="flex justify-end items-center mt-auto pt-6 pb-4 border-t border-gray-200">
            <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                disabled={isPublishing || videoUploading}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPublishing ? 'Publishing...' : (videoUploading ? 'Uploading Video...' : 'Publish Post')}
            </button>
        </div>
      </div>
  );
};

export default CreateBlogPage;
