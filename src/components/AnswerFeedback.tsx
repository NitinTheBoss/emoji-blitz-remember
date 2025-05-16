
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerFeedbackProps {
  isCorrect: boolean | null;
  level: number;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ isCorrect, level }) => {
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
        </>
      )}
    </Alert>
  );
};
