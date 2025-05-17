
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface GameLogicState {
  gameState: "start" | "playing" | "gameOver";
  level: number;
  currentSequence: string[];
  userSequence: string[];
  showSequence: boolean;
  highScore: number;
  feedbackState: boolean | null;
  usedEmojis: string[];
}

export const useGameLogic = () => {
  const [state, setState] = useState<GameLogicState>({
    gameState: "start",
    level: 1,
    currentSequence: [],
    userSequence: [],
    showSequence: false,
    highScore: 0,
    feedbackState: null,
    usedEmojis: [],
  });
  
  const { toast } = useToast();
  
  // Get initial high score from localStorage
  useEffect(() => {
    const storedHighScore = localStorage.getItem("emojiMemoryHighScore");
    if (storedHighScore) {
      setState(prev => ({ ...prev, highScore: parseInt(storedHighScore) }));
    }
  }, []);

  // Generate a random emoji sequence based on level
  const generateSequence = (level: number) => {
    // Updated to match new requirements:
    // Level 1: 1 emoji
    // Level 2: 2 emojis
    // Level 3: 3 emojis, etc.
    const sequenceLength = level;
    
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
    setState(prev => ({
      ...prev,
      gameState: "playing",
      level: 1,
      userSequence: [],
      usedEmojis: [],
      feedbackState: null
    }));
    
    const newSequence = generateSequence(1); // Explicitly pass level 1
    setState(prev => ({
      ...prev,
      currentSequence: newSequence,
      showSequence: true
    }));
    
    // Updated display time formula - Level 1: 2 seconds
    const displayTime = 2 * 1000;
    
    setTimeout(() => {
      setState(prev => ({ ...prev, showSequence: false }));
    }, displayTime);
  };

  // Handle emoji selection from the picker
  const handleEmojiSelect = (emoji: string) => {
    if (state.gameState !== "playing" || state.showSequence) return;
    
    setState(prev => ({ 
      ...prev, 
      userSequence: [...prev.userSequence, emoji],
      usedEmojis: [...prev.usedEmojis, emoji]
    }));
  };

  // Handle submit button
  const handleSubmit = () => {
    if (state.gameState !== "playing" || state.showSequence || state.userSequence.length !== state.currentSequence.length) return;
    
    const isCorrect = state.userSequence.every((emoji, index) => emoji === state.currentSequence[index]);
    
    // Show feedback
    setState(prev => ({ ...prev, feedbackState: isCorrect }));
    
    setTimeout(() => {
      if (isCorrect) {
        // Level up
        const newLevel = state.level + 1;
        setState(prev => ({
          ...prev,
          level: newLevel,
          userSequence: [],
          usedEmojis: [],
          feedbackState: null
        }));
        
        // Update high score if needed
        if (state.level > state.highScore) {
          setState(prev => ({ ...prev, highScore: prev.level }));
          localStorage.setItem("emojiMemoryHighScore", state.level.toString());
        }
        
        // Generate new sequence for next level with correct emoji count
        const newSequence = generateSequence(newLevel);
        setState(prev => ({
          ...prev,
          currentSequence: newSequence,
          showSequence: true
        }));
        
        // Updated display time formula - Level n: (n+1) seconds
        const displayTime = (newLevel + 1) * 1000;
        
        setTimeout(() => {
          setState(prev => ({ ...prev, showSequence: false }));
        }, displayTime);
      } else {
        // Add 2 additional seconds pause to view the correct sequence
        setTimeout(() => {
          // Game over
          setState(prev => ({ ...prev, gameState: "gameOver" }));
          
          // Update high score if needed
          if (state.level > state.highScore) {
            setState(prev => ({ ...prev, highScore: prev.level }));
            localStorage.setItem("emojiMemoryHighScore", state.level.toString());
          }
        }, 2000); // Additional 2-second pause
      }
    }, 1500); // Show feedback for 1.5 seconds
  };

  // Clear user input
  const handleClear = () => {
    setState(prev => ({ 
      ...prev, 
      userSequence: [],
      usedEmojis: []
    }));
  };

  // Delete last emoji
  const handleDelete = () => {
    setState(prev => {
      const newUserSequence = prev.userSequence.slice(0, -1);
      // Remove the last emoji from usedEmojis as well
      const lastEmoji = prev.userSequence[prev.userSequence.length - 1];
      const newUsedEmojis = prev.usedEmojis.filter(emoji => emoji !== lastEmoji);
      
      return {
        ...prev,
        userSequence: newUserSequence,
        usedEmojis: newUsedEmojis
      };
    });
  };

  // Share score on WhatsApp
  const shareOnWhatsApp = () => {
    const totalEmojis = state.level; // Updated to match new sequence length logic
    const message = `I reached Level ${state.level} in Emoji Memory Test and remembered ${totalEmojis} emojis! 🤯 Play it here: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`);
  };

  return {
    ...state,
    startGame,
    handleEmojiSelect,
    handleSubmit,
    handleClear,
    handleDelete,
    shareOnWhatsApp
  };
};
