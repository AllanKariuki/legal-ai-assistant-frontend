"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, onNewChat, onConversationSelect }) => {

    const handleNewConversation = () => {
        if (onNewChat) {
            onNewChat();
        }
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gray-50">
            <Header newChatClick={handleNewConversation} />
                        
            {/* Main content area */}
            <div className="flex-1 flex row overflow-hidden relative">
                {/* Sidebar */}
                <Sidebar onConversationSelect={onConversationSelect} />
                
                {/* Main content */}
                <div className="flex-1 min-w-0 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;