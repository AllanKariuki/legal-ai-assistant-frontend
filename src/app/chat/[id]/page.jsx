"use client";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ChatView from '@/app/components/ChatView';

export default function ChatPage() {
    const params = useParams();
    const conversationId = params?.id;
    const [refreshSidebar, setRefreshSidebar] = useState(0);

    const handleNewChat = () => {
        setRefreshSidebar(prev => prev + 1);
    };

    const handleConversationChange  = (newConversationId) => {
        setRefreshSidebar(prev => prev + 1);
    };

    const handleConversationSelect = (selectedConversationId) => {
        // This will be handled by the router navigation in the Sidebar component
    };

    return (
        <Layout
            onNewChat={handleNewChat}
            onConversationSelect={handleConversationSelect}
        >
            <ChatView
                conversationId={conversationId}
                onConversationChange={handleConversationChange}
            />
        </Layout>
    );
}