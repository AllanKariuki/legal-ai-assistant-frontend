import { ChevronDown } from "lucide-react";

const TaskHeader = ({ title, onClose }) => (
  <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-200">
    <ChevronDown className="w-4 h-4 text-gray-500" />
    <span className="text-sm text-gray-800 flex-grow">{title}</span>
    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </button>
  </div>
);

export default TaskHeader;
