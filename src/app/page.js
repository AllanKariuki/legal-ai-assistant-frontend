
"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import TaskHeader from "./components/TaskHeader";
import MessageContent from "./components/MessageContent";

import ActionButton from "./components/ActionButton";
import { Scale, Search, FileText, BookOpen, Clock } from "lucide-react";
import { Send } from 'lucide-react';
import axios from "axios";
import { post } from './api';
import Sidebar from "./components/Sidebar";

export default function Home() {
  // State for conversation management
  const [messages, setMessages] = useState([]); // Array of {type: 'user'|'ai', content: string, timestamp: number}
  const [taskOpen, setTaskOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [conversationTitle, setConversationTitle] = useState("");
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ conversationId, setConversationId ] =  useState(null);

  const generateconversationTitle = (firstUserMessage) => {
    if (!firstUserMessage) return "New Legal Consultation";

    const message = firstUserMessage.toLowerCase();

    const topicMappings = {
      'contract': "Contract Law consultations",
      'property': "Property Law Discussion",
      'employment': "employment Law Query",
      'criminal': "Criminal Law discussion",
      'family': "Family Law Consultation",
      'business': "Business Law Consultation",
      'intellectual property': 'IP Law Consultation',
      'tort': 'Tort Law Discussion',
      'constitutional': 'Constitutional Law Query',
      'divorce': 'Divorce Law Consultation',
      'accident': 'Personal Injury Consultation',
      'will': 'Estate Planning Discussion',
      'lease': 'Tenancy Law Consultation',
      'dispute': 'Legal Dispute Advisory',
      'rights': 'Rights Advisory',
      'liability': 'Liability Law Discussion',
      'evidence': 'Evidence Law Query',
      'appeal': 'Appeals Process Consultation',
      'court': 'Court Procedure Query',
      'fine': 'Legal Penalty Discussion',
      'injunction': 'Injunction Law Consultation',
      'marriage': 'Marriage Law Discussion',
      'adoption': 'Adoption Law Consultation',
      'child custody': 'Child Custody Law Query',
      'bankruptcy': 'Bankruptcy Law Consultation',
      'insurance': 'Insurance Law Discussion',
      'tax': 'Tax Law Consultation',
    };

    for ( const [keyword, title ] of Object.entries(topicMappings) ) {
      if (message.includes(keyword)) {
        return title;
      }
    }

    const words = firstUserMessage.trim().split(' ');
    if (words.length <= 3) {
      return `Legal Query: ${firstUserMessage}`;
    } else {
      return `Query: ${words.slice(0, 4).join(' ')}...`;
    }
  };

  const fetchConversation = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation/${conversationId}`);
      setMessages(response.data.messages);
      setConversationTitle(response.data.title);
    } catch (error) {
      console.error('Error fetching conversation: ', error);
      // Handle error (e.g., show a notification)
    }
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId, fetchConversation]);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Add user message to conversation immediately
      const userMessage = {
        type: 'user',
        content: prompt,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, userMessage]);

      if (messages.length === 0) {
        const title = generateconversationTitle(prompt);
        setConversationTitle(title);
      }
      
      // Clear the input but keep the current prompt for the task header
      setCurrentPrompt(prompt);
      setPrompt('');
      
      // Send request to API
      const response = await post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/query`, {
        query: userMessage.content,
        conversationTitle: conversationTitle
      });
      setConversationId(response.conversation_id)
      
      // Add AI response to conversation
      const aiMessage = {
        type: 'ai',
        content: response.response,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Show task header after receiving response
      setTaskOpen(true);
      
    } catch (error) {
      console.log("Error sending prompt:", error);
      // Add error message to conversation
      const errorMessage = {
        type: 'ai',
        content: { response: 'Sorry, there was an error processing your request. Please try again.' },
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  const handleNewConversation = () => {
    setConversationId(null);
    setConversationTitle('');
    setMessages([]);
    resetConversation();
  }
  
  const resetConversation = () => {
    setMessages([]);
    setConversationTitle('');
    setTaskOpen(false);
    setPrompt('');
  }

  return (
    <div className="h-screen overflow-y-scroll flex flex-row bg-gray-50">
      <div>
        <Header newChatClick={handleNewConversation} />
        <Sidebar />
      </div>
      
      <div className="max-w-5xl mx-auto h-screen flex flex-col px-4">
           
        {taskOpen && (
          <TaskHeader
            title={conversationTitle || 'Legal Consultation'}
            onClose={() => setTaskOpen(false)}
          />
        )}
        
        {/* Conversation container */}
        <div className="flex-grow py-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500 text-center">
                <p className="text-4xl mb-2">Start a conversation</p>
                <p className="text-sm">Ask a legal question to get started</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className="w-full">
                  {message.type === 'user' ? (
                    <div className="flex justify-end mb-4">
                      <div className="bg-gray-200 text-gray-800 p-4 rounded-xl max-w-xs sm:max-w-md lg:max-w-lg shadow-md">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <div className="w-full max-w-4xl">
                        <MessageContent 
                          response={message.content} 
                          isLoading={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator for current response */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-full max-w-4xl">
                    <MessageContent 
                      response={null} 
                      isLoading={true}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input section - Always at bottom */}
        <div className="w-full bg-gray-50 pt-4 pb-6 lg:min-w-4xl border-t border-gray-200">
          <div className="text-xs flex justify-end mb-1 text-gray-500 text-right">
            Press Enter to send, Shift+Enter for new line
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Ask a legal question..."
              value={prompt}
              name="prompt"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 border 
              border-gray-300 rounded-full 
              text-black
              focus:outline-none 
              focus:ring-1 focus:ring-blue-500 
              focus:border-blue-500
              disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button 
              className="absolute right-3 top-1/2 transform 
              -translate-y-1/2 p-2 bg-gray-900 text-white 
              rounded-full hover:bg-gray-800 transition-colors
              disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleSendPrompt}
              disabled={isLoading || !prompt.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}