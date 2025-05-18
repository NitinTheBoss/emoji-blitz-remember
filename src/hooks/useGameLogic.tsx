
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
  keyboardEmojis: string[];
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
    keyboardEmojis: [],
  });
  
  const { toast } = useToast();
  
  // All available emojis for the game
  const allEmojis = [
    "😀", "😇", "😍", "😘", "😚", "😜", "😭", "😱", 
    "🙊", "👍", "👏", "👑", "💎", "💛", "💞", "🔥",
    "🦄", "🦋", "🦥", "🦚", "🐞", "🐧", "🐢", "🎉",
    "🎀", "🍧", "🍕", "🍰", "🍷", "🍺", "🏆", "🥇"
  ];
  
  // Get initial high score from localStorage
  useEffect(() => {
    const storedHighScore = localStorage.getItem("emojiMemoryHighScore");
    if (storedHighScore) {
      setState(prev => ({ ...prev, highScore: parseInt(storedHighScore) }));
    }
  }, []);

  // Setup keyboard emojis once at game start
  const setupKeyboardEmojis = () => {
    // Shuffle the entire emoji array
    const shuffledEmojis = [...allEmojis].sort(() => Math.random() - 0.5);
    // Use exactly 32 emojis for the keyboard
    const keyboardSet = shuffledEmojis.slice(0, 32);
    return keyboardSet;
  };

  // Generate a random emoji sequence based on level
  const generateSequence = (level: number, keyboardEmojis: string[]) => {
    // Level 1: 1 emoji, Level 2: 2 emojis, etc.
    const sequenceLength = level;
    
    // Shuffle the keyboard emojis to get random selections
    const shuffledKeyboardEmojis = [...keyboardEmojis].sort(() => Math.random() - 0.5);
    
    // Take the first 'level' number of emojis as our sequence
    return shuffledKeyboardEmojis.slice(0, sequenceLength);
  };

  // Start a new game
  const startGame = () => {
    // First, set up keyboard emojis that will be used throughout the game
    const keyboardEmojis = setupKeyboardEmojis();
    
    setState(prev => ({
      ...prev,
      gameState: "playing",
      level: 1,
      userSequence: [],
      usedEmojis: [],
      feedbackState: null,
      keyboardEmojis: keyboardEmojis
    }));
    
    const newSequence = generateSequence(1, keyboardEmojis);
    setState(prev => ({
      ...prev,
      currentSequence: newSequence,
      showSequence: true
    }));
    
    // Level 1: 2 seconds
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
        // Using the same keyboard emojis but different selection
        const newSequence = generateSequence(newLevel, state.keyboardEmojis);
        setState(prev => ({
          ...prev,
          currentSequence: newSequence,
          showSequence: true
        }));
        
        // Level n: (n+1) seconds
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
    const totalEmojis = state.level; // Number of emojis remembered equals level
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
