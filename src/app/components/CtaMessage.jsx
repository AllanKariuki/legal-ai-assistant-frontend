// CTA Message Component
const CtaMessage = ({ number, message, button }) => (
  <div className="text-sm text-gray-800 mb-2">
    <span className="font-medium">{number}.</span> {message} (Button: '{button}')
  </div>
);

export default CtaMessage;