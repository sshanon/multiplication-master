import { Question, Level, Voucher, LevelId } from "./types";

// Generate random number between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
        // Level 3 & 4: full randomization 2-10 (no multiplying by 1)
        num1 = randomInt(2, 10);
        num2 = randomInt(2, 10);
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
