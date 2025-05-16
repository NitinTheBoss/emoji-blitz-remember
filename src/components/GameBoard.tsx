
import React from "react";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  level: number;
  sequence: string[];
  showSequence: boolean;
  userSequence: string[];
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  level, 
  sequence, 
  showSequence, 
  userSequence 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Level {level}</h2>
        <span className="text-sm text-gray-500">{sequence.length} emojis</span>
      </div>
      
      <div className={cn(
        "min-h-[120px] p-4 rounded-xl border-2 border-dashed border-gray-300 flex flex-wrap justify-center items-center gap-2 transition-all duration-300",
        showSequence ? "bg-white" : "bg-gray-50"
      )}>
        {showSequence ? (
          <div className="flex flex-wrap justify-center items-center gap-2 animate-fade-in">
            {sequence.map((emoji, index) => (
              <div 
                key={index} 
                className="text-4xl transition-all duration-300 animate-scale-in" 
                style={{animationDelay: `${index * 100}ms`}}
              >
                {emoji}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-2">
            {userSequence.length === 0 ? (
              <p className="text-gray-400 text-center">Select emojis to match the sequence</p>
            ) : (
              userSequence.map((emoji, index) => (
                <div 
                  key={index} 
                  className="text-4xl transition-all duration-300 animate-scale-in" 
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {emoji}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
