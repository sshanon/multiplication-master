import { Voucher } from "../types";
import { formatTimestamp } from "../utils";

interface RewardScreenProps {
  voucher: Voucher;
  onPlayAgain: () => void;
}

export default function RewardScreen({ voucher, onPlayAgain }: RewardScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4 animate-bounce">
        <div className="text-5xl mb-2">🏆</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">CONGRATULATIONS!</h1>
      </div>

      {/* Voucher Certificate */}
      <div className="bg-white rounded-2xl shadow-xl p-4 max-w-lg w-full border-4 border-amber-400 relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500"></div>

        {/* Voucher Content */}
        <div className="text-center space-y-3 p-2">
          <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-2">
            ⭐ READING VOUCHER ⭐
          </div>

          <div className="bg-gradient-to-r from-violet-100 to-pink-100 rounded-xl p-3 border-2 border-violet-300">
            <p className="text-base text-gray-700">This voucher entitles</p>
            <p className="text-2xl font-bold text-violet-700 my-1">{voucher.childName}</p>
            <p className="text-base text-gray-700">to</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-400 to-sky-400 text-white rounded-xl p-4 shadow-lg">
            <p className="text-4xl font-bold mb-1">{voucher.rewardMinutes}</p>
            <p className="text-xl font-semibold">
              minute{voucher.rewardMinutes > 1 ? "s" : ""}
            </p>
            <p className="text-base mt-1">of Percy Jackson reading</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 border border-gray-300">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Level:</span> {voucher.levelName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">ID:</span>{" "}
              <span className="font-mono text-xs">{voucher.id}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Issued:</span>{" "}
              {formatTimestamp(voucher.timestamp)}
            </p>
          </div>

          <div className="pt-2 border-t border-gray-300">
            <p className="text-gray-500 italic text-xs">
              Screenshot this voucher to claim your reward!
            </p>
          </div>
        </div>
      </div>

      {/* Play Again Button */}
      <button
        onClick={onPlayAgain}
        className="mt-4 bg-sky-400 hover:bg-sky-500 text-white text-lg font-bold rounded-xl shadow-lg px-8 py-4 transform transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Play Again! 🎮
      </button>
    </div>
  );
}
