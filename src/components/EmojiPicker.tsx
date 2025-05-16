
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  currentSequence: string[];
  usedEmojis: string[]; // Track emojis that have already been used
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ 
  onEmojiSelect,
  currentSequence,
  usedEmojis
}) => {
  // Common emojis for selection - we'll shuffle these
  const [availableEmojis, setAvailableEmojis] = useState<string[]>([
    "😀", "😊", "😍", "😎", "🥳", "🤩", "🤔", "🥺", 
    "👍", "👏", "❤️", "🔥", "🌟", "🎁", "🎉", "🍕",
    "🍦", "🍫", "🏆", "🌈", "🦄", "🐶", "🐱", "🦋",
    "🐼", "🦊", "🐢", "🐬", "🦜", "🍓", "🍎", "🥥"
  ]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Update and shuffle emojis to include the current sequence
  useEffect(() => {
    if (currentSequence && currentSequence.length > 0) {
      // Start with all the common emojis
      const allEmojis = [
        "😀", "😊", "😍", "😎", "🥳", "🤩", "🤔", "🥺", 
        "👍", "👏", "❤️", "🔥", "🌟", "🎁", "🎉", "🍕",
        "🍦", "🍫", "🏆", "🌈", "🦄", "🐶", "🐱", "🦋",
        "🐼", "🦊", "🐢", "🐬", "🦜", "🍓", "🍎", "🥥"
      ];
      
      // Make sure current sequence emojis are included
      for (const emoji of currentSequence) {
        if (!allEmojis.includes(emoji)) {
          allEmojis.push(emoji);
        }
      }
      
      // Shuffle all emojis
      const shuffledEmojis = shuffleArray(allEmojis);
      
      // Make sure we have exactly 32 emojis
      const finalEmojis = shuffledEmojis.slice(0, 32);
      
      setAvailableEmojis(finalEmojis);
    }
  }, [currentSequence]);

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="grid grid-cols-8 gap-2">
        {availableEmojis.map((emoji, index) => {
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
