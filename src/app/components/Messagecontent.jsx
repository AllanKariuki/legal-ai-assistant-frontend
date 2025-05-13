import CtaMessage from "./CtaMessage";
import ActionButton from "./ActionButton";

// Message Content Component
const MessageContent = () => {
  const ctaMessages = [
    {
      number: "1",
      message: "'Ready to boost your business? Click now!'",
      button: "Get Started"
    },
    {
      number: "2",
      message: "'Don't miss out on our exclusive offer. Claim yours today!'",
      button: "Claim Offer"
    },
    {
      number: "3",
      message: "'Get ahead of the competition. Sign up now!'",
      button: "Sign Up"
    },
    {
      number: "4",
      message: "'Unleash your potential with our expert guidance. Learn more!'",
      button: "Learn More"
    },
    {
      number: "5",
      message: "'Revamp your online presence with our unbeatable solutions.'",
      button: "Upgrade Now"
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-lg text-gray-800 mb-4 flex items-center gap-2">
        Create 5 CTA messages and buttons for advertising landing page
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path d="M12 4H6a2 2 0 0-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6M16 2l2 2-8 8-2 2v2h2l2-2 8-8z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </h2>
      
      <div className="mb-6">
        {ctaMessages.map((item, index) => (
          <CtaMessage
            key={index}
            number={item.number}
            message={item.message}
            button={item.button}
          />
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <ActionButton variant="pink">Translate</ActionButton>
        <ActionButton variant="primary">Improve</ActionButton>
        <ActionButton variant="blue">Explain</ActionButton>
        <ActionButton variant="indigo">Make longer</ActionButton>
        <ActionButton variant="secondary">Make shorter</ActionButton>
        <ActionButton variant="secondary">Summarize</ActionButton>
      </div>
    </div>
  );
};

export default MessageContent;