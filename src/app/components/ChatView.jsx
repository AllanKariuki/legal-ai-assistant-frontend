"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskHeader from "./TaskHeader";
import MessageContent from "./MessageContent";
import { Send } from 'lucide-react';
import { get, post } from '../api';

const ChatView = ({ conversationId = null, onConversationChange }) => {
    const router = useRouter();

    const [messages, setMessages] = useState([]);
    const [taskOpen, setTaskOpen] =useState(false);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [conversationTitle, setConversationTitle] = useState('');
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateConversationTitle = (firstUserMessage) => {
        if (!firstUserMessage) return "New Legal Consultation";

        const message = firstUserMessage.toLowerCase();

        const topicMappings = {
            'contract': "Contract Law consultations",
            'property': "Property Law Discussion",
            'employment': "Employment Law Query",
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
            'arrest': 'Arrest Law Consultation',
            'bail': 'Bail Law Discussion',
            'certificate': 'Certificate Law Query',
            'complaint': 'Complaint Law Consultation',
        }

        for (const [keyword, title] of Object.entries(topicMappings)) {
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
        if (!conversationId) {
            // Reset state for new conversation
            setMessages([]);
            setConversationTitle('');
            setTaskOpen(false);
            setPrompt('');
            return;
        }

        try {
            const response = await get(`/conversations/${conversationId}`);
            setMessages(response.messages);
            setConversationTitle(response.title);
            setTaskOpen(response.messages.length > 0 );
        } catch (error) {
            console.error('Error fetching conversation: ', error);
            // Handle error (e.g., show a notification)
        }

    }, [conversationId]);

    useEffect(() => {
        fetchConversation();
    }, conversationId, fetchConversation);

    const handleSendPrompt = async () => {
        if (!prompt.trim()) return;

        try {
            setIsLoading(true);

            // Add user message to the conversation immediately
            const userMessage = {
                type: 'user',
                content: prompt,
                timeStamp: Date.now()
            }
            setMessages(prev => [...prev, userMessage]);

            let title = conversationTitle;
            if (messages.length === 0) {
                title = generateConversationTitle(prompt);
                setConversationTitle(title);
            }

            // Clear the input but keep the current prompt for the task header
            setCurrentPrompt(prompt);
            setPrompt('');

            // Set request to API
            const response = await post(`/query`, {
                query: userMessage.content,
                conversationTitle: title,
            });

            // If this is a new conversation, navigate to the conversation route
            if (!conversationId && response.conversation_id) {
                router.push(`/chat/${response.conversation_id}`);
                if (onConversationChange) {
                    onConversationChange(response.conversation_id);
                }
                return; // Exit early as the route change will handle the rest
            }

            // Add AI response to conversation
            const aiMessage = {
                type: 'ai',
                content: response.response,
                timeStamp: Date.now()
            }

            setMessages(prev => [...prev, aiMessage]);
            setTaskOpen(true);
        } catch (error) {
            console.error('Error sending prompt: ', error);
            // Add error message to the conversation
            const errorMessage = {
                type: ai,
                content: 'Sorry, there was an error processing your request. Please try again.',
                timeStamp: Date.now()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeypress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendPrompt();
        }
    };

    return (
        <div className='max-w-5xl mx-auto h-screen flex flex-col px-4'>
            {taskOpen && (
                <TaskHeader
                title = {conversationTitle || 'Legal Consultation'}
                onClose={() => setTaskOpen(false)}
                />
            )}

            {/* conversation container */}

            <div className="flex-grow py-5">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-500 text-center">
                            <p className="text-4xl mb-2">Start a covnersation</p>
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
                                ): (
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

                        {/* Loading indicator for current responses */}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-full max-w-4xl">
                                    <MessageContent
                                        reponse={null}
                                        isLoading={true}
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                )} 
            </div>

            {/* Input section - Always at the bottom */}
            <div className="w-full bg-gray-50 pt-4 pb-6 lg:min-4-4xl border-t border-gray-200">
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
                        onKeyPress={handleKeypress}
                        disabled={isLoading}
                        className="w-full px-4 py-3 pr-12 border
                         border-gray-300 rounded-full text-black 
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
    )

}

export default ChatView;