
import React from "react";
import { Button } from "@/components/ui/button";

interface GameOverProps {
  level: number;
  startNewGame: () => void;
  shareOnWhatsApp: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ 
  level, 
  startNewGame, 
  shareOnWhatsApp 
}) => {
  // Updated calculation to match new sequence length logic
  const totalEmojis = level;
  
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Game Over!</h2>
      <div className="mb-6">
        <p className="text-xl font-semibold text-pink-600">Level {level}</p>
        <p className="text-lg text-gray-600">You remembered {totalEmojis} emojis! 🎉</p>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={shareOnWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-lg flex items-center justify-center gap-2"
        >
          <span>Share on WhatsApp</span>
        </Button>
        
        <Button 
          onClick={startNewGame}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl text-lg"
        >
          Play Again
        </Button>
      </div>
    </div>
  );
};
