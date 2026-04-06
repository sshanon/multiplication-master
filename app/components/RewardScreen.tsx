import { Voucher } from "../types";
import { formatTimestamp } from "../utils";

interface RewardScreenProps {
  voucher: Voucher;
  onPlayAgain: () => void;
}

export default function RewardScreen({ voucher, onPlayAgain }: RewardScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-200 to-blue-200 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8 animate-bounce">
        <div className="text-8xl mb-4">🏆</div>
        <h1 className="text-6xl font-bold text-gray-800">CONGRATULATIONS!</h1>
      </div>

      {/* Voucher Certificate */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full border-8 border-yellow-400 relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-yellow-600"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-yellow-600"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-yellow-600"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-yellow-600"></div>

        {/* Voucher Content */}
        <div className="text-center space-y-6 p-4">
          <div className="text-5xl font-bold text-yellow-600 mb-4">
            ⭐ READING VOUCHER ⭐
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300">
            <p className="text-2xl text-gray-700 mb-2">This voucher entitles</p>
            <p className="text-4xl font-bold text-purple-700 mb-2">{voucher.childName}</p>
            <p className="text-2xl text-gray-700">to</p>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-2xl p-8 shadow-lg">
            <p className="text-6xl font-bold mb-2">{voucher.rewardMinutes}</p>
            <p className="text-3xl font-semibold">
              minute{voucher.rewardMinutes > 1 ? "s" : ""}
            </p>
            <p className="text-2xl mt-2">of Percy Jackson reading</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-semibold">Level Completed:</span> {voucher.levelName}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-semibold">Voucher ID:</span>{" "}
              <span className="font-mono text-sm">{voucher.id}</span>
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Issued:</span>{" "}
              {formatTimestamp(voucher.timestamp)}
            </p>
          </div>

          <div className="pt-4 border-t-2 border-gray-300">
            <p className="text-gray-500 italic text-sm">
              Screenshot this voucher and show it to claim your reward!
            </p>
          </div>
        </div>
      </div>

      {/* Play Again Button */}
      <button
        onClick={onPlayAgain}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold rounded-2xl shadow-lg px-12 py-6 transform transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Play Again! 🎮
      </button>
    </div>
  );
}
