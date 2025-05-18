
import React from "react";
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  currentSequence: string[];
  usedEmojis: string[]; // Track emojis that have already been used
  keyboardEmojis: string[]; // Predefined emoji set that includes all sequence emojis
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ 
  onEmojiSelect,
  usedEmojis,
  keyboardEmojis
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="grid grid-cols-8 gap-2">
        {keyboardEmojis.map((emoji, index) => {
          const isUsed = usedEmojis.includes(emoji);
          return (
            <Button
              key={index}
              onClick={() => !isUsed && onEmojiSelect(emoji)}
              className={`h-10 w-10 p-0 flex items-center justify-center text-2xl ${
                isUsed 
                  ? "bg-gray-200 cursor-not-allowed opacity-50" 
                  : "bg-white hover:bg-gray-100 border border-gray-200"
              } rounded-lg shadow-sm`}
              disabled={isUsed}
            >
              {emoji}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
