// Action Button Component
const ActionButton = ({ children, variant = "secondary", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-full text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    indigo: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    pink: "bg-pink-100 text-pink-700 hover:bg-pink-200"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default ActionButton;