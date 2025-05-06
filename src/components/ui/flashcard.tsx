
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface FlashcardProps {
  question: string;
  answer: string;
  className?: string;
}

const Flashcard = ({ question, answer, className }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isDarkMode = document.documentElement.classList.contains('dark');

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={cn("flip-card w-full h-64 md:h-80", isFlipped && "flipped", className)}
      onClick={toggleFlip}
    >
      <div className="flip-card-inner w-full h-full">
        <div className={cn(
          "flip-card-front w-full h-full rounded-xl p-6 shadow-md flex flex-col justify-center items-center", 
          isDarkMode ? "bg-gray-700 text-white" : "bg-white"
        )}>
          <h3 className={cn("text-xl font-medium mb-2", isDarkMode ? "text-white" : "text-quickstudy-text")}>Question:</h3>
          <p className="text-center text-lg">{question}</p>
          <div className={cn("mt-4 text-sm", isDarkMode ? "text-gray-400" : "text-gray-400")}>Click to flip</div>
        </div>
        <div className={cn(
          "flip-card-back w-full h-full rounded-xl p-6 shadow-md flex flex-col justify-center items-center",
        )} style={{ color: isDarkMode ? 'wheat' : 'black', backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }}>
          <h3 className="text-xl font-medium mb-2 text-quickstudy-purple">Answer:</h3>
          <p className="text-center text-lg" >{answer}</p>
          <div className={cn("mt-4 text-sm", isDarkMode ? "text-gray-400" : "text-gray-400")}>Click to flip back</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
