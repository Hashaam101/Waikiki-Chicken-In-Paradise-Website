import React, { useState } from 'react';

interface ReviewPopupProps {
  onClose: () => void;
  onSubmit: (rating: number, feedback?: string) => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [phone, setPhone] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const FEEDBACK_WORD_LIMIT = 300;

  const handleStarClick = (star: number) => {
    setRating(star);
    if (star < 4) {
      setShowFeedback(true);
    } else {
      setShowGooglePrompt(true);
      setTimeout(() => {
        window.open('https://search.google.com/local/writereview?placeid=ChIJCeDZi7pzAHwR2-opn5R1-Is', '_blank');
        onClose();
      }, 1800);
    }
  };

  const handleFeedbackSubmit = async () => {
    setFeedbackError('');
    setPhoneError('');
    if (!rating) return;
    // Feedback must not be empty and must be at least 3 words
    const trimmedFeedback = feedback.trim();
    const wordCount = trimmedFeedback.split(/\s+/).filter(Boolean).length;
    if (!trimmedFeedback) {
      setFeedbackError('Please enter your feedback.');
      return;
    }
    if (wordCount < 3) {
      setFeedbackError('Please enter at least 3 words.');
      return;
    }
    if (feedback && wordCount > FEEDBACK_WORD_LIMIT) {
      setFeedbackError(`Please limit your feedback to ${FEEDBACK_WORD_LIMIT} words. Currently: ${wordCount}`);
      return;
    }
    // Phone validation (optional, only if provided)
    if (phone) {
      // Accepts numbers, spaces, dashes, parentheses, and +, must be 7-20 digits
      // Allow + only at the start
      const plusOk = phone[0] === '+' ? phone.slice(1) : phone;
      const cleaned = plusOk.replace(/[^\d]/g, '');
      if (cleaned.length < 7 || cleaned.length > 20 || (phone.match(/\+/g) || []).length > 1 || (phone.includes('+') && phone[0] !== '+')) {
        setPhoneError('Please enter a valid phone number (7-20 digits, "+" allowed only at the start).');
        return;
      }
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setSubmitted(true);
        onSubmit(rating, feedback);
      }, 1000);
    }, 1800);
    // Send feedback to Google Sheets webhook using FormData to avoid CORS issues
    try {
      const formData = new FormData();
      formData.append('rating', String(rating));
      formData.append('feedback', feedback);
      let phoneToSend = phone;
      if (phoneToSend.startsWith('+')) {
        phoneToSend = "'" + phoneToSend;
      }
      formData.append('phone', phoneToSend);
  fetch('https://script.google.com/macros/s/AKfycbzcWRQzmGkeNXIQWCtuMmEkMIz5w2Uq0hGR1Q7s5ZSggexlfTgm-3KudQeHCGJhgXnjKw/exec', {
        method: 'POST',
        body: formData
      });
    } catch (e) {
      // Optionally handle error
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <style>{`
        .svg-container { display: flex; justify-content: center; align-items: center; height: 120px; }
  .ft-green-tick { display: block; margin: 0 auto; }
        @supports (animation: grow .5s cubic-bezier(.25, .25, .25, 1) forwards) {
          .tick {
            stroke-opacity: 0;
            stroke-dasharray: 29px;
            stroke-dashoffset: 29px;
            animation: draw .5s cubic-bezier(.25, .25, .25, 1) forwards;
            animation-delay: .6s;
          }
          .circle {
            fill-opacity: 0;
            /* Use your site's red color for both fill and stroke */
            stroke: var(--primary-dark, #b91c1c);
            stroke-width: 16px;
            transform-origin: center;
            transform: scale(0);
            animation: grow 1s cubic-bezier(.25, .25, .25, 1.25) forwards;
          }
        }
        @keyframes grow {
          60% {
            transform: scale(.8);
            stroke-width: 4px;
            fill-opacity: 0;
          }
          100% {
            transform: scale(.9);
            stroke-width: 8px;
            fill-opacity: 1;
            fill: var(--primary-dark, #b91c1c);
          }
        }
        @keyframes draw {
          0%, 100% { stroke-opacity: 1; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
  <div className="bg-white rounded-xl py-8 px-6 w-full max-w-md shadow-lg relative flex flex-col justify-center">
  <button className="absolute top-4 right-4 text-gray-500 hover:text-black" style={{top: '1rem', right: '1rem'}} onClick={onClose}>&times;</button>
        {showGooglePrompt ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="text-lg font-bold mb-2 text-center text-primary-dark">Please give us a review on Google!</div>
            <div className="text-gray-800 text-center mb-4">We appreciate your support. Redirecting you now...</div>
          </div>
        ) : sending ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="svg-container">
              <svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
                <circle className="circle" fill="var(--primary-dark, #b91c1c)" cx="24" cy="24" r="22"/>
                <path className="tick" fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
              </svg>
            </div>
            <div className="text-lg font-bold mt-4 text-center text-gray-900">Sending your feedback...</div>
          </div>
        ) : sent ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="svg-container">
              <svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
                <circle className="circle" fill="var(--primary-dark, #b91c1c)" cx="24" cy="24" r="22"/>
                <path className="tick" fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
              </svg>
            </div>
            <div className="text-lg font-bold mt-4 text-center text-green-700">Sent!</div>
          </div>
        ) : submitted ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            {rating && rating < 4 ? (
              <>
                <div className="text-lg font-bold mb-2 text-center text-gray-900">We're sorry for your experience.</div>
                <div className="text-gray-800 text-center mb-4">Thank you for your feedback. We'll use it to improve our service.</div>
              </>
            ) : (
              <>
                <div className="text-lg font-bold mb-2 text-center text-gray-900">Thank you for your review!</div>
                <div className="text-gray-800 text-center mb-4">We appreciate your support.</div>
              </>
            )}
            <button className="mt-2 px-4 py-2 bg-primary-dark text-white rounded hover:bg-primary" onClick={onClose}>Close</button>
          </div>
        ) : !showFeedback ? (
          <>
            <div className="text-lg font-bold mb-4 text-center text-gray-900">How would you rate us?</div>
            <div className="flex justify-center mb-4">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  className={`text-3xl mx-1 transition-colors duration-150 ${
                    (hoveredStar !== null ? star <= hoveredStar : rating && star <= rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  ★
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-lg font-bold mb-4 text-center text-gray-900">We'd love your feedback</div>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-1 text-gray-900 placeholder-gray-400"
              rows={3}
              placeholder="Tell us how we can improve..."
              value={feedback}
              onChange={e => {
                if (e.target.value.trim().split(/\s+/).length <= FEEDBACK_WORD_LIMIT) {
                  setFeedback(e.target.value);
                } else {
                  setFeedback(e.target.value.trim().split(/\s+/).slice(0, FEEDBACK_WORD_LIMIT).join(' '));
                }
                setFeedbackError('');
              }}
              style={{ color: '#222' }}
            />
            <div className="text-xs text-gray-500 mb-1 text-right">{feedback.trim().split(/\s+/).filter(Boolean).length} / {FEEDBACK_WORD_LIMIT} words</div>
            {feedbackError && <div className="text-xs text-red-600 mb-1">{feedbackError}</div>}
            <input
              type="tel"
              className="w-full border border-gray-300 rounded p-2 mb-2 text-gray-900 placeholder-gray-400 text-sm"
              placeholder="Your phone number (optional)"
              value={phone}
              onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
              maxLength={20}
            />
            {phoneError && <div className="text-xs text-red-600 mb-1">{phoneError}</div>}
            <div className="mb-2 text-center text-sm text-gray-700">You can also call us at <a href="tel:808-123-4567" className="text-primary-dark font-bold">808-123-4567</a></div>
            <button
              className="bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary w-full"
              onClick={handleFeedbackSubmit}
            >
              Submit Feedback
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewPopup;
