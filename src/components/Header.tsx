
import React from "react";

interface HeaderProps {
  highScore: number;
}

export const Header: React.FC<HeaderProps> = ({ highScore }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white text-center">
      <h1 className="text-2xl font-bold mb-1">Emoji Memory Test</h1>
      <p className="text-sm opacity-90">High Score: Level {highScore || 0}</p>
    </div>
  );
};
