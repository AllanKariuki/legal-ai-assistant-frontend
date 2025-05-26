import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { get } from '../api';
import { useParams, useRouter } from 'next/navigation';
import { AlignLeft, X } from 'lucide-react';

const Sidebar = ({ onConversationSelect, isOpen, onClose }) => {
    const router = useRouter();
    const params = useParams();
    const currentConversationId = params?.id;

    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Start with true

    const groupConversationsByDate = (conversations) => {
        const sections = {
            Today: [],
            Yesterday: [],
            'This week': [],
            Older: [],
        };

        if (!conversations || conversations.length === 0) {
            return sections;
        }

        const now = new Date();
        const today = now.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        conversations.forEach(conv => {
            // Handle ISO string format from the API payload
            const created = new Date(conv.created_at);
            const createdStr = created.toDateString();

            if (createdStr === today) {
                sections.Today.push(conv);
            } else if (createdStr === yesterdayStr) {
                sections.Yesterday.push(conv);
            } else {
                // Check if within the week
                const diff = (now - created) / (1000 * 60 * 60 * 24);
                if (diff < 7) {
                    sections['This week'].push(conv);
                } else {
                    sections.Older.push(conv);
                }
            }
        });

        return sections;
    }

    const fetchConversations = useCallback(async () => {
        setLoading(true);
        try {
            const response = await get('/conversations');
            setConversations(response);
        } catch (error) {
            console.error('Error fetching conversations: ', error);
            setError('Failed to load conversations');
            // Handle error (e.g., show a notification)
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations]);

    const handleConversationClick = (conversationId) => {
        router.push(`/chat/${conversationId}`);
        if (onConversationSelect) {
            onConversationSelect(conversationId)
        }
    }

    const handleNewChat = () => {
        router.push('/');
        if (onConversationSelect) {
            onConversationSelect(null);
        }
    }

    // Skeleton Loader Component
    const SkeletonLoader = () => (
        <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0 animate-pulse">
            {/* Mobile close button skeleton */}
            <div className="md:hidden flex justify-between items-center p-3 border-b border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
            </div>

            {/* New Chat Button skeleton */}
            <div className='p-3 border-b border-gray-200'>
                <div className="w-full h-12 bg-gray-200 rounded-full"></div>
            </div>

            {/* Conversations List skeleton */}
            <div className='flex-1 overflow-y-auto p-3'>
                {/* Today section */}
                <div className='mb-4'>
                    <div className='h-4 bg-gray-200 rounded w-12 mb-2'></div>
                    <div className='space-y-2'>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-full p-3 rounded-lg bg-gray-50">
                                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                                <div className='h-3 bg-gray-200 rounded w-1/3'></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Yesterday section */}
                <div className='mb-4'>
                    <div className='h-4 bg-gray-200 rounded w-16 mb-2'></div>
                    <div className='space-y-2'>
                        {[1, 2].map(i => (
                            <div key={i} className="w-full p-3 rounded-lg bg-gray-50">
                                <div className='h-4 bg-gray-200 rounded w-4/5 mb-2'></div>
                                <div className='h-3 bg-gray-200 rounded w-1/4'></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* This week section */}
                <div className='mb-4'>
                    <div className='h-4 bg-gray-200 rounded w-20 mb-2'></div>
                    <div className='space-y-2'>
                        {[1].map(i => (
                            <div key={i} className="w-full p-3 rounded-lg bg-gray-50">
                                <div className='h-4 bg-gray-200 rounded w-2/3 mb-2'></div>
                                <div className='h-3 bg-gray-200 rounded w-1/5'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const grouped = groupConversationsByDate(conversations);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return (
            <div className='w-64 h-full bg-white border-r border-gray-200 p-3 flex-shrink-0'>
                {/* Mobile close button */}
                <div className="md:hidden flex justify-end mb-4">
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className='text-red-500 p-2'>
                    {error}
                    <button 
                        className='block mt-2 text-blue-500 hover:text-blue-700'
                        onClick={fetchConversations}
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
            {/* Mobile close button */}
            <div className="md:hidden flex justify-between items-center p-3 border-b border-gray-200">
                <div className="text-xl font-semibold text-gray-800">
                    Legal AI
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-5 h-5 text-300" />
                </button>
            </div>

            {/* New Chat Button */}
            <div className='p-3 border-b border-gray-200'>
                <button 
                    className="w-full flex items-center 
                        gap-2 bg-gray-200 
                        rounded-full text-white
                        px-4 py-3 hover:cursor-pointer hover:shadow-md hover:bg-blue-50 transition-colors" 
                        onClick={handleNewChat}
                    >
                        <AlignLeft className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">New chat</span>
                </button>
            </div>

            {/* Conversations List */}
            <div className='flex-1 overflow-y-auto p-3'>
                {conversations.length === 0 ? (
                    <div className='text-gray-500 italic text-sm'>
                        No conversations found. Start a new conversation!
                    </div>
                ) : (
                    <ul className="space-y-2 flex flex-col">
                        {Object.entries(grouped).map(([section, items]) => 
                            items.length > 0 ? (
                            <div key={section} className=''>
                                    <h5 className='font-light text-sm text-gray-400 mb-2'>{section}</h5>
                                    <div className='space-y-1'>
                                        {items.map(conv => (
                                            <button 
                                                key={conv.id}
                                                onClick={() => handleConversationClick(conv.id)}
                                                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors 
                                                    ${currentConversationId === conv.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                                                    `}
                                                >
                                                    <div className='truncate text-sm font-medium text-gray-600'>
                                                        {conv.title || 'Untitled Conversation'}
                                                    </div>
                                                    <div className='text-xs text-gray-500 mt-1'>
                                                        {new Date(conv.created_at).toLocaleTimeString([], {
                                                            hour: '2-digit', 
                                                            minute: '2-digit', 
                                                            hour12: false
                                                        })}
                                                    </div>
                                            </button>
                                        ))}
                                    </div>
                            </div> 
                            ) : null
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sidebar;