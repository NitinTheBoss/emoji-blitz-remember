
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerFeedbackProps {
  isCorrect: boolean | null;
  level: number;
  correctSequence?: string[]; // Add the correct sequence to show when incorrect
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ 
  isCorrect, 
  level,
  correctSequence = []
}) => {
  if (isCorrect === null) return null;

  return (
    <Alert 
      className={cn(
        "mb-4 transition-all duration-300 animate-scale-in", 
        isCorrect 
          ? "bg-green-50 border-green-200 text-green-800" 
          : "bg-red-50 border-red-200 text-red-800"
      )}
    >
      {isCorrect ? (
        <>
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertTitle className="font-bold">Correct!</AlertTitle>
          <AlertDescription>
            Moving to Level {level + 1}
          </AlertDescription>
        </>
      ) : (
        <>
          <XCircle className="h-5 w-5 text-red-500" />
          <AlertTitle className="font-bold">Incorrect!</AlertTitle>
          <AlertDescription>
            You reached Level {level}
          </AlertDescription>
          {correctSequence.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Correct sequence was:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {correctSequence.map((emoji, idx) => (
                  <span key={idx} className="text-xl">{emoji}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Alert>
  );
};
