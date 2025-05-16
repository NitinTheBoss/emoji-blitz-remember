
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  currentSequence: string[];
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ 
  onEmojiSelect,
  currentSequence 
}) => {
  // Common emojis for quick selection - we'll ensure current sequence emojis are included
  const [availableEmojis, setAvailableEmojis] = useState<string[]>([
    "😀", "😊", "😍", "😎", "🥳", "🤩", "🤔", "🥺", 
    "👍", "👏", "❤️", "🔥", "🌟", "🎁", "🎉", "🍕",
    "🍦", "🍫", "🏆", "🌈", "🦄", "🐶", "🐱", "🦋"
  ]);

  // Update emojis to include the current sequence
  useEffect(() => {
    if (currentSequence && currentSequence.length > 0) {
      setAvailableEmojis(prevEmojis => {
        // Create a new array with current sequence emojis first
        const newEmojis = [...currentSequence];
        
        // Add other common emojis that aren't in the sequence
        for (const emoji of [
          "😀", "😊", "😍", "😎", "🥳", "🤩", "🤔", "🥺", 
          "👍", "👏", "❤️", "🔥", "🌟", "🎁", "🎉", "🍕",
          "🍦", "🍫", "🏆", "🌈", "🦄", "🐶", "🐱", "🦋"
        ]) {
          if (!newEmojis.includes(emoji) && newEmojis.length < 24) {
            newEmojis.push(emoji);
          }
        }
        
        return newEmojis;
      });
    }
  }, [currentSequence]);

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="grid grid-cols-8 gap-2">
        {availableEmojis.map((emoji, index) => (
          <Button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="h-10 w-10 p-0 flex items-center justify-center text-2xl bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  );
};
