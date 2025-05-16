
import React from "react";

export const Instructions: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">How to Play</h2>
      <div className="space-y-3 text-sm text-gray-600">
        <p>1. Memorize the emoji sequence shown</p>
        <p>2. After 2 seconds, the emojis will disappear</p>
        <p>3. Use the emoji picker to recreate the sequence</p>
        <p>4. Each correct answer adds 2 more emojis</p>
        <p>5. See how far you can go!</p>
      </div>
    </div>
  );
};
