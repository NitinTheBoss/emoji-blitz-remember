
import { EmojiPicker } from "../components/EmojiPicker";
import { GameBoard } from "../components/GameBoard";
import { GameOver } from "../components/GameOver";
import { Header } from "../components/Header";
import { Instructions } from "../components/Instructions";
import { AnswerFeedback } from "../components/AnswerFeedback";
import { Button } from "@/components/ui/button";
import { useGameLogic } from "@/hooks/useGameLogic";

const Index = () => {
  const {
    gameState,
    level,
    currentSequence,
    userSequence,
    showSequence,
    highScore,
    feedbackState,
    usedEmojis,
    startGame,
    handleEmojiSelect,
    handleSubmit,
    handleClear,
    handleDelete,
    shareOnWhatsApp
  } = useGameLogic();
  
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
                {feedbackState !== null && (
                  <AnswerFeedback 
                    isCorrect={feedbackState} 
                    level={level} 
                  />
                )}
                
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
                <EmojiPicker 
                  onEmojiSelect={handleEmojiSelect}
                  currentSequence={currentSequence}
                  usedEmojis={usedEmojis}
                />
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
