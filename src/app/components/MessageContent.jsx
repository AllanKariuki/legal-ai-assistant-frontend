"use client";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ActionButton from "./ActionButton";
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown-light.css';
import { ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

const TYPING_SPEED = 15;

const MessageContent = ({ response, isLoading = false, hideActions = false, disableTyping = false }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (isLoading || !response) {
      setDisplayedText("");
      setFullText("");
      setTypingComplete(false);
      return;
    }

    let content = "";

    if (typeof response === "string") {
      content = response;
    } else if (typeof response === "object") {
      content = JSON.stringify(response, null, 2);
    } else {
      content = String(response || "");
    }

    content = content.replace(/,\s*$/, '').trim().replace(/\n\s*$/, '');
    setFullText(content);
    setDisplayedText(""); 
    setTypingComplete(false);
  }, [response, isLoading]);

  useEffect(() => {
    if (!fullText) return;

    if (disableTyping) {
      setDisplayedText(fullText);
      setTypingComplete(true);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        const next = fullText.slice(0, index + 1);
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          setTypingComplete(true);
        }
        return next;
      });
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, [fullText]);

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
        </div>
      </div>
    );
  }

  if (!response || !response) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-gray-500">No response available</div>
      </div>
    );
  }

  return (
    <div className="p-6 xl:min-w-4xl">
      <div className="mb-6">
        <div className="markdown-body bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {displayedText || "No valid content to display."}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Only show action buttons when typing is complete and not hidden */}
      {!hideActions && typingComplete && (
        <div className="flex flex-wrap gap-3 mb-6 border-t border-gray-200 pt-4 px-4">
          <Copy className='text-gray-500 w-4 h-4 hover:cursor-pointer' />
          <ThumbsUp className='text-gray-500 w-4 h-4 hover:cursor-pointer' />
          <ThumbsDown className='text-gray-500 w-4 h-4 hover:cursor-pointer' />
        </div>
      )}
    </div>
  );
};

export default MessageContent;