"use client";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, onNewChat, onConversationSelect }) => {
    const handleNewConversation = () => {
        if (onNewChat) {
            onNewChat();
        }
    };

    return (
        <div className="h-screen overflow-hidded flex flex-col bg-gray-50">
            {/* Header */}
            {/* <Header newChatClick={handleNewConversation} /> */}
            
            {/* Main content area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <Sidebar onConversationSelect={onConversationSelect} />
                
                {/* Main content */}
                <div className="flex-1 overflow-y-auto">
                {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;