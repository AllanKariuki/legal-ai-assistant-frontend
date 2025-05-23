import { AlignLeft } from "lucide-react";

const Header = ({ newChatClick }) => (
  <div className="flex items-center justify-between p-4">
    <button className="flex items-center gap-2 bg-gray-200 spce-x-2 rounded-full px-4 py-3 hover:cursor-pointer" onClick={newChatClick}>
      <AlignLeft className="w-5 h-5 text-gray-500" />
      <span className="text-black">New chat</span>
    </button>
  </div>
);

export default Header;