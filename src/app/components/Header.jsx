// import { AlignLeft } from "lucide-react";

// const Header = ({ newChatClick }) => (
//   <div className="flex items-center justify-between p-4 block md:hidden">
//     <button className="flex items-center gap-2 bg-gray-200 spce-x-2 rounded-full px-4 py-3 hover:cursor-pointer" onClick={newChatClick}>
//       <AlignLeft className="w-5 h-5 text-gray-500" />
//       <span className="text-black">New chat</span>
//     </button>
//   </div>
// );

// export default Header;

import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ newChatClick, onToggleSidebar }) => {
    return (
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between blobk md:hidden">
            {/* Left side - Mobile menu button and logo */}
            <div className="flex items-center gap-3">
                {/* Mobile menu button - only show on smaller screens */}
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="w-5 h-5 text-gray-300" />
                </button>
                
                {/* Logo/Brand */}
                <div className="text-xl font-semibold text-gray-800">
                    Legal AI
                </div>
            </div>

            {/* Center - could be used for breadcrumbs or title */}
            <div className="flex-1 text-center">
                {/* Optional: Add breadcrumbs or current conversation title here */}
            </div>

        </header>
    );
};

export default Header;