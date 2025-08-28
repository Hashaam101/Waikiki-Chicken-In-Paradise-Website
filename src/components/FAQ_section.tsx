import FAQ from './FAQ';

const FAQSection = () => {
  // Sample FAQ data
  const faqItems = [
    {
      question: "Where is Waikiki Chicken In Paradise located?",
      answer: "Our food truck is conveniently situated near Waikiki Beach, offering easy access for beachgoers and tourists."
    },
    {
      question: "What are your operating hours?",
      answer: "We are open daily from 11:00 AM to 9:00 PM, 7 days a week, serving delicious meals throughout the day."
    },
    {
      question: "Is your food truck wheelchair accessible?",
      answer: "Yes, our setup is designed to accommodate all guests, including those with mobility challenges."
    },
    {
      question: "Can I place an order for delivery?",
      answer: "Nope, as of right now, we don't have delivery services."
    },
    {
      question: "Is parking available near your location?",
      answer: "Yes, there are several parking options available nearby for our customers' convenience."
    },
    {
      question: "Do you accept credit or debit cards?",
      answer: "Yes, we accept all major credit and debit cards for your convenience."
    },
    {
      question: "Are your ingredients locally sourced?",
      answer: "We prioritize using locally sourced ingredients to support Hawaiian farmers and ensure the delivery of fresh, high-quality meals; however, some items are not locally sourced as well."
    },
    {
      question: "Do you offer catering services for events?",
      answer: "Contact us at +18434788609"
    },
    {
      question: "Can I make a reservation?",
      answer: "You can, Although you can just walk in as well, we welcome walk-ins and strive to serve all our guests promptly."
    }
  ];

  return (
    <div className="">
      <FAQ faqItems={faqItems} />
    </div>
  );
};

export default FAQSection;