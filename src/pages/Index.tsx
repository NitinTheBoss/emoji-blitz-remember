
import { useEffect, useState, useRef } from "react";
import { EmojiPicker } from "../components/EmojiPicker";
import { GameBoard } from "../components/GameBoard";
import { GameOver } from "../components/GameOver";
import { Header } from "../components/Header";
import { Instructions } from "../components/Instructions";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameOver">("start");
  const [level, setLevel] = useState(1);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  // Get initial high score from localStorage
  useEffect(() => {
    const storedHighScore = localStorage.getItem("emojiMemoryHighScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }
  }, []);

  // Generate a random emoji sequence based on level
  const generateSequence = () => {
    const baseLength = 3;
    const additionalEmojis = (level - 1) * 2;
    const sequenceLength = baseLength + additionalEmojis;
    
    const emojiRange = [
      0x1F600, 0x1F607, 0x1F60D, 0x1F618, 0x1F61A, 0x1F61C, 0x1F62D, 0x1F631, 
      0x1F64A, 0x1F44D, 0x1F44F, 0x1F451, 0x1F48E, 0x1F49B, 0x1F49E, 0x1F525,
      0x1F984, 0x1F98B, 0x1F9A9, 0x1F99A, 0x1F41E, 0x1F427, 0x1F422, 0x1F389,
      0x1F380, 0x1F367, 0x1F355, 0x1F370, 0x1F377, 0x1F37A, 0x1F3C6, 0x1F947
    ];
    
    const newSequence: string[] = [];
    
    while (newSequence.length < sequenceLength) {
      const randomIndex = Math.floor(Math.random() * emojiRange.length);
      const emojiCode = emojiRange[randomIndex];
      const emoji = String.fromCodePoint(emojiCode);
      
      if (!newSequence.includes(emoji)) {
        newSequence.push(emoji);
      }
    }
    
    return newSequence;
  };

  // Start a new game
  const startGame = () => {
    setGameState("playing");
    setLevel(1);
    setUserSequence([]);
    const newSequence = generateSequence();
    setCurrentSequence(newSequence);
    setShowSequence(true);
    
    // Hide sequence after 2 seconds
    setTimeout(() => {
      setShowSequence(false);
    }, 2000);
  };

  // Handle emoji selection from the picker
  const handleEmojiSelect = (emoji: string) => {
    if (gameState !== "playing" || showSequence) return;
    
    setUserSequence((prev) => [...prev, emoji]);
  };

  // Handle submit button
  const handleSubmit = () => {
    if (gameState !== "playing" || showSequence || userSequence.length !== currentSequence.length) return;
    
    const isCorrect = userSequence.every((emoji, index) => emoji === currentSequence[index]);
    
    if (isCorrect) {
      // Level up
      const newLevel = level + 1;
      setLevel(newLevel);
      setUserSequence([]);
      
      // Update high score if needed
      if (level > highScore) {
        setHighScore(level);
        localStorage.setItem("emojiMemoryHighScore", level.toString());
      }
      
      // Generate new sequence for next level
      const newSequence = generateSequence();
      setCurrentSequence(newSequence);
      setShowSequence(true);
      
      // Hide sequence after 2 seconds
      setTimeout(() => {
        setShowSequence(false);
      }, 2000);
    } else {
      // Game over
      setGameState("gameOver");
      
      // Update high score if needed
      if (level > highScore) {
        setHighScore(level);
        localStorage.setItem("emojiMemoryHighScore", level.toString());
      }
    }
  };

  // Clear user input
  const handleClear = () => {
    setUserSequence([]);
  };

  // Delete last emoji
  const handleDelete = () => {
    setUserSequence((prev) => prev.slice(0, -1));
  };

  // Share score on WhatsApp
  const shareOnWhatsApp = () => {
    const baseEmojisCount = 3;
    const totalEmojis = baseEmojisCount + (level - 1) * 2;
    const message = `I reached Level ${level} in Emoji Memory Test and remembered ${totalEmojis} emojis! 🤯 Play it here: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <Header highScore={highScore} />
        
        {gameState === "start" && (
          <div className="p-6">
            <Instructions />
            <Button 
              onClick={startGame}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl text-lg shadow-md transform transition hover:scale-105"
            >
              Start Game
            </Button>
          </div>
        )}
        
        {gameState === "playing" && (
          <div className="p-6">
            <GameBoard 
              level={level}
              sequence={currentSequence}
              showSequence={showSequence}
              userSequence={userSequence}
            />
            
            {!showSequence && (
              <div className="mt-6">
                <div className="flex gap-2 mb-4">
                  <Button 
                    onClick={handleClear}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Clear
                  </Button>
                  <Button 
                    onClick={handleDelete}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                    disabled={userSequence.length === 0}
                  >
                    Delete
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    disabled={userSequence.length !== currentSequence.length}
                  >
                    Submit
                  </Button>
                </div>
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
        )}
        
        {gameState === "gameOver" && (
          <GameOver 
            level={level} 
            startNewGame={startGame}
            shareOnWhatsApp={shareOnWhatsApp}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
