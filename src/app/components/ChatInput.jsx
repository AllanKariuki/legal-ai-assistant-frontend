import { Send } from 'lucide-react';

const ChatInput = () => (
  <div className="p-4">
    <div className="text-xs flex justify-end mb-1 text-gray-500 mt-2 text-right">
      Enter To Send Prompt
    </div>
    <div className="relative">
      <input
        type="text"
        placeholder="Improve design with AI"
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
        <Send className="w-4 h-4" />
      </button>
    </div>
    
  </div>
);

export default ChatInput