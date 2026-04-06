"use client";

import { useState, useEffect } from "react";
import { GameSession } from "../types";

interface QuestionScreenProps {
  session: GameSession;
  onAnswer: (answer: number) => void;
}

export default function QuestionScreen({ session, onAnswer }: QuestionScreenProps) {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ type: "correct" | "incorrect"; correctAnswer?: number } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(session.level.timeLimit);

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const progress = session.currentQuestionIndex + 1;
  const total = session.questions.length;

  // Timer for Level 4
  useEffect(() => {
    if (session.level.timeLimit && timeRemaining !== undefined) {
      if (timeRemaining <= 0) {
        // Time's up - handled by parent
        return;
      }

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === undefined || prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [session.level.timeLimit, timeRemaining]);

  const handleNumberClick = (num: string) => {
    if (feedback) return; // Don't allow input while showing feedback
    setCurrentAnswer((prev) => prev + num);
  };

  const handleBackspace = () => {
    if (feedback) return;
    setCurrentAnswer((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!currentAnswer || feedback) return;

    const answer = parseInt(currentAnswer);
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setFeedback({ type: "correct" });
    } else {
      setFeedback({ type: "incorrect", correctAnswer: currentQuestion.correctAnswer });
    }

    // Move to next question after showing feedback
    setTimeout(() => {
      onAnswer(answer);
      setCurrentAnswer("");
      setFeedback(null);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Backspace") {
      handleBackspace();
    } else if (/^[0-9]$/.test(e.key)) {
      handleNumberClick(e.key);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col p-4"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Top Bar with Progress and Timer */}
      <div className="flex justify-between items-start mb-8 mt-4">
        {/* Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="text-xl font-semibold text-gray-700">
            Question {progress} of {total}
          </div>
          <div className="w-48 bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(progress / total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Timer (Level 4 only) */}
        {session.level.timeLimit && timeRemaining !== undefined && (
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className={`text-4xl font-bold ${timeRemaining <= 20 ? "text-red-500 animate-pulse" : "text-gray-800"}`}>
              ⏱️ {timeRemaining}s
            </div>
          </div>
        )}
      </div>

      {/* Question - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-6">
          <div className="text-7xl font-bold text-gray-800">
            {currentQuestion.num1} × {currentQuestion.num2} = ?
          </div>
        </div>

        {/* Answer Display */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 min-h-[100px] flex items-center justify-center">
          <div className="text-6xl font-bold text-blue-600">
            {currentAnswer || "_"}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`rounded-2xl p-6 mb-4 text-2xl font-bold ${
              feedback.type === "correct"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {feedback.type === "correct" ? (
              <div>✓ Correct! Great job!</div>
            ) : (
              <div>
                ✗ Not quite. The answer is {feedback.correctAnswer}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-4 max-w-md">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            disabled={!!feedback}
            className="bg-white hover:bg-blue-100 text-gray-800 text-4xl font-bold rounded-2xl shadow-lg p-8 transform transition-all duration-100 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleBackspace}
          disabled={!!feedback}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-2xl font-bold rounded-2xl shadow-lg p-8 transform transition-all duration-100 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⌫
        </button>
        <button
          onClick={() => handleNumberClick("0")}
          disabled={!!feedback}
          className="bg-white hover:bg-blue-100 text-gray-800 text-4xl font-bold rounded-2xl shadow-lg p-8 transform transition-all duration-100 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          0
        </button>
        <button
          onClick={handleSubmit}
          disabled={!currentAnswer || !!feedback}
          className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-2xl shadow-lg p-8 transform transition-all duration-100 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✓
        </button>
      </div>
      </div>
    </div>
  );
}
