
"use client";
import { useState } from "react";
import Layout from "./components/Layout";
import ChatView from "./components/ChatView";


export default function Home() {
  const [refreshSidebar, setRefreshSidebar] = useState(0);

  const handleNewChat = () => {
    // This will be handled by the router navigation in the Chatview component
    setRefreshSidebar(prev => prev + 1);
  };

  const handleconversationChange = (conversationId) => {
    // Refresh sidebar to show the new Conversation
    setRefreshSidebar(prev => prev + 1);
  }

  const handleConversationSelect = (conversationId) => {
    // This will be handled by the router navigation in the sidebar component
  }

  return (
    <Layout
      onNewChat={handleNewChat}
      onConversationSelect={handleConversationSelect}
      >
        <ChatView
          conversationId={null}
          onConversationChange={handleconversationChange}
        />
    </Layout>
  );
}