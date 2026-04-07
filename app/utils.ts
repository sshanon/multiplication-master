import { Question, Level, Voucher, LevelId } from "./types";

// Generate random number between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Weighted random for harder numbers (favors 6, 7, 8, 9)
function weightedRandomForHard(): number {
  // 70% chance of harder numbers (6, 7, 8, 9)
  // 30% chance of easier numbers (2, 3, 4, 5, 10)
  if (Math.random() < 0.7) {
    // Harder numbers
    return randomInt(6, 9);
  } else {
    // Easier numbers
    const easyNums = [2, 3, 4, 5, 10];
    return easyNums[randomInt(0, 4)];
  }
}

// Generate questions based on level
export function generateQuestions(level: Level): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < level.questionCount; i++) {
    let num1: number, num2: number;

    switch (level.id) {
      case 1:
        // Level 1: 2-5 × 2-5 (no multiplying by 1)
        num1 = randomInt(2, 5);
        num2 = randomInt(2, 5);
        break;

      case 2:
        // Level 2: Everything from Level 1 (2-5 × 2-5)
        // PLUS multiplications involving 2, 5, or 10 up to 10
        do {
          num1 = randomInt(2, 10);
          num2 = randomInt(2, 10);
        } while (
          // Reject if both > 5 AND neither is 2, 5, or 10
          num1 > 5 && num2 > 5 &&
          ![2, 5, 10].includes(num1) &&
          ![2, 5, 10].includes(num2)
        );
        break;

      case 3:
      case 4:
        // Level 3 & 4: weighted toward harder numbers (6-9)
        num1 = weightedRandomForHard();
        num2 = weightedRandomForHard();
        break;

      default:
        num1 = randomInt(2, 10);
        num2 = randomInt(2, 10);
    }

    questions.push({
      num1,
      num2,
      correctAnswer: num1 * num2,
    });
  }

  return questions;
}

// Generate unique voucher ID
function generateVoucherId(): string {
  return `VOUCHER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Create a voucher
export function createVoucher(levelId: LevelId, levelName: string, rewardMinutes: number): Voucher {
  const now = new Date();
  return {
    id: generateVoucherId(),
    levelId,
    levelName,
    rewardMinutes,
    timestamp: now.toISOString(),
    childName: "Yonatan",
  };
}

// Save voucher to localStorage
export function saveVoucher(voucher: Voucher): void {
  if (typeof window === "undefined") return;

  const existingVouchers = getVouchers();
  existingVouchers.push(voucher);
  localStorage.setItem("multiplication-master-vouchers", JSON.stringify(existingVouchers));
}

// Get all vouchers from localStorage
export function getVouchers(): Voucher[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("multiplication-master-vouchers");
  return stored ? JSON.parse(stored) : [];
}

// Format date for display
export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Get total minutes earned from all vouchers
export function getTotalMinutesEarned(): number {
  const vouchers = getVouchers();
  return vouchers.reduce((total, voucher) => total + voucher.rewardMinutes, 0);
}

// Get minutes spent
export function getMinutesSpent(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem("multiplication-master-minutes-spent");
  return stored ? parseInt(stored) : 0;
}

// Add minutes to spent counter
export function spendMinutes(minutes: number): void {
  if (typeof window === "undefined") return;
  const currentSpent = getMinutesSpent();
  localStorage.setItem("multiplication-master-minutes-spent", (currentSpent + minutes).toString());
}

// Get available balance (earned - spent)
export function getMinutesBalance(): number {
  return getTotalMinutesEarned() - getMinutesSpent();
}
