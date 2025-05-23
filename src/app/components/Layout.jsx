"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, onNewChat, onConversationSelect }) => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleNewConversation = () => {
        if (onNewChat) {
            onNewChat();
        }
    };

    const isMidView = windowWidth <= 1024 && windowWidth > 768;

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gray-50">
            {/* Header */}
            {isMidView && (
                <Header newChatClick={handleNewConversation} />
            )}
                        
            {/* Main content area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                { !isMidView && (
                    <Sidebar onConversationSelect={onConversationSelect} />
                )}
                
                {/* Main content */}
                <div className="flex-1 overflow-y-auto">
                {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;