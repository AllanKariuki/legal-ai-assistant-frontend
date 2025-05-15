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


export default function Home() {
  const [taskOpen, setTaskOpen] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8000/api/query", {
        query: prompt,
      })
      
      setResponse(response.data);
    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   handleSendPrompt();
  // })
  useEffect(() => {
    setResponse({
      response:
        "I am an AI assistant that provides general legal information. This is not legal advice and should not be substituted for advice from a qualified legal professional.\n\n### Mitigation in Kenyan Law\n\nIn the Kenyan legal context, \"mitigation\" generally refers to two distinct but related concepts:\n\n1.  **Mitigation of Damages (in Civil Law):** This refers to the duty of a party who has suffered a loss (due to a breach of contract, tort, etc.) to take reasonable steps to minimize or reduce the extent of their loss. The injured party cannot simply stand by and allow the damages to increase unnecessarily.\n\n    *   **Duty to Mitigate:** The injured party has a legal duty to take reasonable steps to mitigate their losses.\n    *   **Reasonable Steps:** What constitutes \"reasonable steps\" depends on the specific circumstances of the case. It might involve finding a replacement supplier, seeking alternative employment, or taking steps to repair damaged property.\n    *   **Failure to Mitigate:** If the injured party fails to take reasonable steps to mitigate their losses, the court may reduce the amount of damages they are awarded.\n    *   **Burden of Proof:** The burden of proving that the injured party failed to mitigate their losses rests on the party who breached the contract or committed the tort.\n\n2.  **Mitigation in Sentencing (in Criminal Law):** This refers to factors presented to a court *after* a conviction but *before* sentencing, with the aim of persuading the court to impose a more lenient sentence.\n\n    *   **Purpose:** The purpose of mitigation is to provide the court with information about the offender's background, circumstances, and remorse, which might explain their actions and justify a lesser sentence.\n    *   **Mitigating Factors:** Common mitigating factors include:\n        *   Remorse and genuine apology\n        *   First-time offender status\n        *   Cooperation with the police\n        *   Difficult personal circumstances (e.g., poverty, family responsibilities)\n        *   Mental health issues\n        *   Good character references\n        *   Plea of guilty (demonstrates remorse and saves court time)\n    *   **Impact on Sentencing:** The court will consider the mitigating factors along with the aggravating factors (factors that make the offense more serious) when determining the appropriate sentence. Mitigation can lead to a reduced sentence, such as a shorter prison term, a fine instead of imprisonment, or a non-custodial sentence (e.g., probation).\n\n**Important Considerations:**\n\n*   **Case-Specific:** The specific application of mitigation principles will depend heavily on the facts of each individual case.\n*   **Legal Representation:** It is crucial to seek legal advice from a qualified advocate to understand how mitigation applies to your specific situation, whether in a civil or criminal context.\n*   **Evidence:** Evidence is required to support claims of mitigation.\n\n**Disclaimer:** This information is for general knowledge only and does not constitute legal advice. You should consult with a qualified legal professional for advice tailored to your specific circumstances.\n"
    });
  }, []);

  return (
    <div className="h-screen overflow-y-scroll flex flex-col bg-gray-50">
      <Header />
      <div className="max-w-5/6 mx-auto h-screen flex flex-col">
           
        {taskOpen && (
          <TaskHeader
            title={prompt}
            onClose={() => setTaskOpen(false)}
          />
        )}
         {/* Add flex-grow to push the content to the bottom */}
        <div className="flex-grow"></div>
        <div className="w-full">
          <div className={`rounded-lg shadow-md text-gray-800 mb-10`}>
            <MessageContent response={response} isLoading={isLoading} />
          </div>
        
          <div className="mb-10">
            <div className="text-xs flex justify-end mb-1 text-gray-500 mt-2 text-right">
              Enter To Send Prompt
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Improve design with AI"
                value={prompt}
                name="prompt"
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 pr-12 border 
                border-gray-300 rounded-full 
                text-black
                focus:outline-none 
                focus:ring-1 focus:ring-blue-500 
                focus:border-blue-500"
              />
              <button 
              className="absolute right-3 top-1/2 transform 
              -translate-y-1/2 p-2 bg-gray-900 text-white 
              rounded-full hover:bg-gray-800 transition-colors"
              onClick={handleSendPrompt}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
          </div>

        </div> 
      </div>
      
    </div>
  );
}
