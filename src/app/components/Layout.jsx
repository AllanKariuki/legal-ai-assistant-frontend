"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, onNewChat, onConversationSelect }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNewConversation = () => {
        if (onNewChat) {
            onNewChat();
        }
        // Close sidebar on mobile after action
        setSidebarOpen(false);
    };

    const handleConversationSelect = (conversationId) => {
        if (onConversationSelect) {
            onConversationSelect(conversationId);
        }
        // Close sidebar on mobile after selection
        setSidebarOpen(false);
    };

    // Close sidebar when clicking outside on mobile
    const handleOverlayClick = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gray-50">
            <Header 
                newChatClick={handleNewConversation} 
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
                        
            {/* Main content area */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={handleOverlayClick}
                    />
                )}
                
                {/* Sidebar */}
                <div className={`
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 
                    transition-transform duration-300 ease-in-out
                    fixed md:relative 
                    z-50 md:z-auto
                    h-full
                    md:block
                `}>
                    <Sidebar 
                        onConversationSelect={handleConversationSelect}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                </div>
                
                {/* Main content */}
                <div className="flex-1 min-w-0 overflow-y-auto md:ml-0">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;