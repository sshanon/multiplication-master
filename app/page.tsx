"use client";

import { useState } from "react";
import LevelSelector from "./components/LevelSelector";
import QuestionScreen from "./components/QuestionScreen";
import RewardScreen from "./components/RewardScreen";
import { Level, GameSession, Voucher } from "./types";
import { generateQuestions, createVoucher, saveVoucher } from "./utils";

type GameState = "select" | "playing" | "reward" | "failed";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("select");
  const [session, setSession] = useState<GameSession | null>(null);
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  const handleSelectLevel = (level: Level) => {
    const questions = generateQuestions(level);
    const newSession: GameSession = {
      level,
      questions,
      currentQuestionIndex: 0,
      answers: new Array(level.questionCount).fill(null),
      startTime: Date.now(),
      timeRemaining: level.timeLimit,
    };
    setSession(newSession);
    setGameState("playing");
  };

  const handleAnswer = (answer: number) => {
    if (!session) return;

    // Record the answer
    const updatedAnswers = [...session.answers];
    updatedAnswers[session.currentQuestionIndex] = answer;

    // Move to next question or end session
    const nextIndex = session.currentQuestionIndex + 1;

    if (nextIndex >= session.questions.length) {
      // Session complete - check if all answers are correct
      const allCorrect = session.questions.every(
        (q, i) => updatedAnswers[i] === q.correctAnswer
      );

      if (allCorrect) {
        // Generate voucher
        const newVoucher = createVoucher(
          session.level.id,
          session.level.name,
          session.level.rewardMinutes
        );
        saveVoucher(newVoucher);
        setVoucher(newVoucher);
        setGameState("reward");
      } else {
        setGameState("failed");
      }
    } else {
      // Continue to next question
      setSession({
        ...session,
        currentQuestionIndex: nextIndex,
        answers: updatedAnswers,
      });
    }
  };

  const handlePlayAgain = () => {
    setSession(null);
    setVoucher(null);
    setGameState("select");
  };

  // Handle time out for Level 4
  const handleTimeOut = () => {
    setGameState("failed");
  };

  if (gameState === "select") {
    return <LevelSelector onSelectLevel={handleSelectLevel} />;
  }

  if (gameState === "playing" && session) {
    // Check if time ran out (Level 4)
    if (session.level.timeLimit && session.timeRemaining !== undefined && session.timeRemaining <= 0) {
      handleTimeOut();
    }

    return <QuestionScreen session={session} onAnswer={handleAnswer} />;
  }

  if (gameState === "reward" && voucher) {
    return <RewardScreen voucher={voucher} onPlayAgain={handlePlayAgain} />;
  }

  if (gameState === "failed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-3">💪</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Keep Practicing!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            You need to get all questions correct to earn the voucher.
            <br />
            Don't give up, Yonatan!
          </p>
          <button
            onClick={handlePlayAgain}
            className="bg-sky-400 hover:bg-sky-500 text-white text-lg font-bold rounded-xl shadow-lg px-8 py-4 transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Try Again! 🎮
          </button>
        </div>
      </div>
    );
  }

  return null;
}
