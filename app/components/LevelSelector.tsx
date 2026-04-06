"use client";

import { useState, useEffect } from "react";
import { Level } from "../types";
import { LEVELS } from "../levels";
import { getMinutesBalance, spendMinutes } from "../utils";

interface LevelSelectorProps {
  onSelectLevel: (level: Level) => void;
}

export default function LevelSelector({ onSelectLevel }: LevelSelectorProps) {
  const [balance, setBalance] = useState(0);
  const [showSpendUI, setShowSpendUI] = useState(false);
  const [minutesToSpend, setMinutesToSpend] = useState("");

  useEffect(() => {
    setBalance(getMinutesBalance());
  }, []);

  const handleSpendMinutes = () => {
    const amount = parseInt(minutesToSpend);
    if (amount > 0 && amount <= balance) {
      spendMinutes(amount);
      setBalance(getMinutesBalance());
      setMinutesToSpend("");
      setShowSpendUI(false);
    }
  };

  const levelColors = [
    "bg-green-500 hover:bg-green-600",
    "bg-blue-500 hover:bg-blue-600",
    "bg-purple-500 hover:bg-purple-600",
    "bg-red-500 hover:bg-red-600",
  ];

  const levelEmojis = ["🌟", "🚀", "👑", "🏆"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Multiplication Master
        </h1>
        <p className="text-lg text-gray-600">
          Choose your level, Yonatan!
        </p>
      </div>

      {/* Minutes Balance */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-4 w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📚</div>
            <div>
              <p className="text-sm text-gray-600">Reading Time Balance</p>
              <p className="text-2xl font-bold text-purple-600">
                {balance} minute{balance !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSpendUI(!showSpendUI)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
          >
            {showSpendUI ? "Cancel" : "Use Minutes"}
          </button>
        </div>

        {/* Spend Minutes UI */}
        {showSpendUI && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">How many minutes did you read?</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={minutesToSpend}
                onChange={(e) => setMinutesToSpend(e.target.value)}
                placeholder="Enter minutes"
                min="1"
                max={balance}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleSpendMinutes}
                disabled={!minutesToSpend || parseInt(minutesToSpend) <= 0 || parseInt(minutesToSpend) > balance}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-6 py-2 transition-colors"
              >
                Done Reading!
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {LEVELS.map((level, index) => (
          <button
            key={level.id}
            onClick={() => onSelectLevel(level)}
            className={`${levelColors[index]} text-white rounded-xl shadow-lg p-5 transform transition-all duration-200 hover:scale-105 active:scale-95`}
          >
            <div className="text-4xl mb-2">{levelEmojis[index]}</div>
            <h2 className="text-2xl font-bold mb-1">
              Level {level.id}: {level.name}
            </h2>
            <p className="text-base mb-2 opacity-90">{level.description}</p>
            <div className="bg-white bg-opacity-20 rounded-lg p-2 mt-2">
              <p className="text-xs">
                {level.questionCount} questions
                {level.timeLimit && ` • ${level.timeLimit}s time limit`}
              </p>
              <p className="text-xs font-semibold mt-1">
                🎁 Reward: {level.rewardMinutes} min{level.rewardMinutes > 1 ? "s" : ""} Percy Jackson
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
