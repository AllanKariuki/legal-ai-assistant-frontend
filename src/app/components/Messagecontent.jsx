// "use client";
// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import ActionButton from "./ActionButton";
// import remarkGfm from 'remark-gfm';

// // Message Content Component
// const MessageContent = ({ response, isLoading = false }) => {
//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto">
//         <div className="animate-pulse">
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
//           <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!response || !response.response) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto">
//         <div className="text-gray-500">No response available</div>
//       </div>
//     );
//   }

//   // Debugging: Log the response
//   console.log("Response in MessageContent:", response);
  
//   // Ensure the response is a string and handle potential issues
//   let markdownContent = "";
  
//   if (typeof response?.response === "string") {
//     markdownContent = response.response;
//   } else if (response?.response && typeof response?.response === "object") {
//     // If it's an object, try to convert it to a readable string
//     markdownContent = JSON.stringify(response?.response, null, 2);
//   } else {
//     markdownContent = String(response?.response || "");
//   }
  
//   // Clean the markdown content - remove any potential trailing commas or invalid characters
//   markdownContent = markdownContent
//     .replace(/,\s*$/, '')
//     .trim()
//     .replace(/\n\s*$/, '');
  
//   // Debugging: Log the markdown content
//   console.log("Markdown Content:", markdownContent);
//   console.log("Type of markdown content:", typeof markdownContent);

  
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="mb-6">
//         {/* REMOVED prose classes - they conflict with custom components */}
//         <div className="text-gray-800 max-w-none">
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             components={{
//               h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200" {...props} />,
//               h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-3" {...props} />,
//               h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2" {...props} />,
//               p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
//               ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
//               ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
//               li: ({node, ...props}) => <li className="mb-1 text-gray-700" {...props} />,
//               code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-purple-600" {...props} />,
//               pre: ({node, ...props}) => <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
//               blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-200 pl-4 my-4 italic text-gray-600" {...props} />,
//               strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
//               em: ({node, ...props}) => <em className="italic text-blue-600" {...props} />
//             }}
//           >
//             {markdownContent || "No valid content to display."}
//           </ReactMarkdown>
//         </div>
//       </div>
//       <div className="flex flex-wrap gap-3 mb-6 border-t border-gray-200 pt-4">
//         <ActionButton variant="pink">Translate</ActionButton>
//         <ActionButton variant="primary">Improve</ActionButton>
//         <ActionButton variant="blue">Explain</ActionButton>
//         <ActionButton variant="indigo">Make longer</ActionButton>
//         <ActionButton variant="secondary">Make shorter</ActionButton>
//         <ActionButton variant="secondary">Summarize</ActionButton>
//       </div>
//     </div>
//   );
// };

// export default MessageContent;


"use client";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ActionButton from "./ActionButton";
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown-light.css';

const TYPING_SPEED = 15; // milliseconds between each character

const MessageContent = ({ response, isLoading = false }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");

  useEffect(() => {
    if (isLoading || !response?.response) return;

    let content = "";

    if (typeof response.response === "string") {
      content = response.response;
    } else if (typeof response.response === "object") {
      content = JSON.stringify(response.response, null, 2);
    } else {
      content = String(response.response || "");
    }

    content = content.replace(/,\s*$/, '').trim().replace(/\n\s*$/, '');
    setFullText(content);
    setDisplayedText(""); // Reset on new response
  }, [response, isLoading]);

  useEffect(() => {
    if (!fullText) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        const next = fullText.slice(0, index + 1);
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
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

  if (!response || !response.response) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-gray-500">No response available</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {displayedText || "No valid content to display."}
          </ReactMarkdown>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-6 border-t border-gray-200 pt-4">
        <ActionButton variant="pink">Translate</ActionButton>
        <ActionButton variant="primary">Improve</ActionButton>
        <ActionButton variant="blue">Explain</ActionButton>
        <ActionButton variant="indigo">Make longer</ActionButton>
        <ActionButton variant="secondary">Make shorter</ActionButton>
        <ActionButton variant="secondary">Summarize</ActionButton>
      </div>
    </div>
  );
};

export default MessageContent;
