import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Sidebar = () => {
    const [conversations, setConversations] = useState([]);
    
    const [ loading, setLoading ] = useState(false);

    const fetchConversations = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.
        }
    }, []); 

    return (
        <div className="absolute p-3 bg-gray-80 text-gray-800 w-[15vw]">
            <ul className="space-y-2 flex flex-col">
                <h5>Yesterday</h5>
                <li className="block w-full hover:bg-gray-200 p-2 rounded-lg overflow-x-wrap">
                    Test Search about mitigation
                </li>
                <li className="block w-full hover:bg-gray-200 p-2 rounded-lg overflow-x-wrap">
                    Test Search about mitigation
                </li>
                <li className="block w-full hover:bg-gray-200 p-2 rounded-lg overflow-x-wrap">
                    Test Search about mitigation
                </li>
                <li className="block w-full hover:bg-gray-200 p-2 rounded-lg overflow-x-wrap">
                    Test Search about mitigation
                </li>
                <li className="block w-full hover:bg-gray-200 p-2 rounded-lg overflow-x-wrap">
                    Test Search about mitigation
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;