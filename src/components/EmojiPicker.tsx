
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  // Common emojis for quick selection
  const commonEmojis = [
    "😀", "😊", "😍", "😎", "🥳", "🤩", "🤔", "🥺", 
    "👍", "👏", "❤️", "🔥", "🌟", "🎁", "🎉", "🍕",
    "🍦", "🍫", "🏆", "🌈", "🦄", "🐶", "🐱", "🦋"
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="grid grid-cols-8 gap-2">
        {commonEmojis.map((emoji, index) => (
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
