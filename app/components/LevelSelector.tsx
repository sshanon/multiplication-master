import { Level } from "../types";
import { LEVELS } from "../levels";

interface LevelSelectorProps {
  onSelectLevel: (level: Level) => void;
}

export default function LevelSelector({ onSelectLevel }: LevelSelectorProps) {
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
