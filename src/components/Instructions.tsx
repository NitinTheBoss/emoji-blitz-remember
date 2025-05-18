
import React from "react";

export const Instructions: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">How to Play</h2>
      <div className="space-y-3 text-sm text-gray-600">
        <p>1. Memorize the emoji sequence shown</p>
        <p>2. Level 1: 1 emoji for 2 seconds</p>
        <p>3. Level 2: 2 emojis for 3 seconds</p>
        <p>4. Each level adds 1 more emoji and 1 more second</p>
        <p>5. See how far you can go!</p>
      </div>
    </div>
  );
};
