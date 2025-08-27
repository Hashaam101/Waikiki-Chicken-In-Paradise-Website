import FAQ from './FAQ';

const FAQSection = () => {
  // Sample FAQ data
  const faqItems = [
    {
      question: "What areas do you serve?",
      answer: "We serve Honolulu, Waikiki, and surrounding Oahu areas with takeaway and delivery."
    },
    {
      question: "Where are you located?",
      answer: (
        <span>
          400 Keawe St, Honolulu, HI 96813 (<a href="https://maps.google.com/?q=400+Keawe+St,+Honolulu,+HI+96813" target="_blank" rel="noopener noreferrer" className="text-primary underline">View on Maps</a>)
        </span>
      )
    },
    {
      question: "What are your opening hours?",
      answer: "Mon–Sun: 11:00 AM – 9:00 PM"
    },
    {
      question: "Do you offer takeaway or delivery services?",
      answer: "Yes! Order via DoorDash, Postmates, or call in for pickup."
    },
    {
      question: "Is parking available nearby?",
      answer: "Yes, complimentary parking is available for all SunTea Mix guests."
    },
    {
      question: "Can I host small gatherings or study at SunTea Mix?",
      answer: "Definitely — we’re a cozy spot with a welcoming atmosphere for friends, study sessions, or casual hangouts."
    },
    {
      question: "How long do soufflé pancakes take to make?",
      answer: "They’re made fresh to order and usually take around 20 minutes. Worth the wait!"
    },
    {
      question: "Do you have gluten-free options?",
      answer: "Yes, some of our drinks and desserts are gluten-free. Just ask our staff when ordering."
    },
    {
      question: "Do you offer non-dairy or vegan options?",
      answer: "Yes! Many of our drinks can be made with oat, almond, or soy milk. We also have fruit teas and desserts that are dairy-free."
    },
    {
      question: "Are your drinks customizable?",
      answer: "Absolutely — you can adjust sweetness, ice level, and toppings (boba, jelly, pudding, etc.)."
    }
  ];

  return (
    <div className="">
      <FAQ faqItems={faqItems} />
    </div>
  );
};

export default FAQSection;