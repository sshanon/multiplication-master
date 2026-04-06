export type LevelId = 1 | 2 | 3 | 4;

export interface Level {
  id: LevelId;
  name: string;
  description: string;
  scope: string;
  questionCount: number;
  timeLimit?: number; // in seconds, only for Level 4
  rewardMinutes: number;
}

export interface Question {
  num1: number;
  num2: number;
  correctAnswer: number;
}

export interface GameSession {
  level: Level;
  questions: Question[];
  currentQuestionIndex: number;
  answers: (number | null)[];
  startTime: number;
  timeRemaining?: number; // for timed levels
}

export interface Voucher {
  id: string;
  levelId: LevelId;
  levelName: string;
  rewardMinutes: number;
  timestamp: string;
  childName: string;
}
