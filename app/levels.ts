import { Level } from "./types";

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Starter",
    description: "Multiplication up to 5×5",
    scope: "Build familiarity and confidence",
    questionCount: 25,
    rewardMinutes: 1,
  },
  {
    id: 2,
    name: "Builder",
    description: "Level 1 + times 2, 5, and 10",
    scope: "Reinforce patterns (2, 5, 10)",
    questionCount: 15,
    rewardMinutes: 1,
  },
  {
    id: 3,
    name: "Master",
    description: "Full table (harder numbers!)",
    scope: "Achieve accuracy and fluency",
    questionCount: 10,
    rewardMinutes: 2,
  },
  {
    id: 4,
    name: "Champion",
    description: "Hardest numbers + time pressure!",
    scope: "Speed + accuracy under pressure",
    questionCount: 10,
    timeLimit: 100, // 100 seconds total
    rewardMinutes: 5,
  },
];
