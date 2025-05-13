"use client";
import Image from "next/image";
import { useState } from "react";
import Header from "./components/Header";
import TaskHeader from "./components/TaskHeader";
import MessageContent from "./components/MessageContent";
import ChatInput from "./components/ChatInput";
import ActionButton from "./components/ActionButton";
import { Scale, Search, FileText, BookOpen, Clock } from "lucide-react";


export default function Home() {
  const [taskOpen, setTaskOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="max-w-5/6 mx-auto h-screen flex flex-col">
           
        {taskOpen && (
          <TaskHeader
            title="Create 5 CTA messages and buttons for advertising landing..."
            onClose={() => setTaskOpen(false)}
          />
        )}
        
        <div className="overflow-y-auto  rounded-lg shadow-md h-1/3 mb-10">
          <MessageContent />
        </div>
        
        <ChatInput />
      </div>
      
    </div>
  );
}
