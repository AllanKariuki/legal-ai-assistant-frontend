import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { get  } from '../api';
import { useParams, useRouter } from 'next/navigation';

const Sidebar = ({ onConversationSelect }) => {
    const router = useRouter();
    const params = useParams();
    const currentConversationId = params?.id;


    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState(null);
    const [ loading, setLoading ] = useState(false);

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
    }, []);

    const handleConversationClick = () => {
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

    const grouped = groupConversationsByDate(conversations);

    if (loading) {
        return (
            <div className='w-64 h-full bg-white border-r border-gray-200 p-3'>
                <div className='flex justify-center items-center h-32'>
                    <div className='text-gray-500'>Loading conversations...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='absolute p-3 text-gray-800 w-64'>
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
        <div className="absolute p-3 text-gray-800 w-64 flex flex-col border-r border-gray-200">
            <div className='p-3 border-b border-gray-200'>
                <button 
                    className="w-full flex items-center 
                        gap-2 bg-gray-200 
                        spce-x-2 rounded-full text-white
                        px-4 py-3 hover:cursor-pointer hover:bg-blue-700 transition-colors" 
                        onClick={handleNewChat}
                    >
                        <AlignLeft className="w-5 h-5 text-gray-500" />
                        <span className="text-black">New chat</span>
                </button>
            </div>

            <div className='flex-1 overflow-y-auto p-3'>
                {/* Conversations list */}
                {conversations.length === 0 ? (
                    <div className='test-gray-500 italic text-sm'>
                        No conversations found. Start a new conversation!
                    </div>
                ) : (
                    <ul className="space-y-2 flex flex-col">
                        {Object.entries(grouped).map(([section, items]) => 
                            items.length > 0 ? (
                            <div key={section} className=''>
                                    <h5 className='font-semibold text-sm text-gray-600 mb-2'>{section}</h5>
                                    <div className='space-y-1'>
                                        {items.map(conv => (
                                            
                                            <button 
                                                key={conv.id}
                                                onClick={() => handleConversationClick(conv.id)}
                                                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors 
                                                    ${currentConversationId === conv.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                                                    `}
                                                >
                                                    <div className='truncate text-sm font-medium'>
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