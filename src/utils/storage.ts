import { ProgressState } from "../types";

export const STORAGE_KEY = "cognitive-gallery-progress";

export function loadStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function createDefaultProgress(): ProgressState {
  return {
    totalAnswers: 0,
    correctAnswers: 0,
    accuracy: 0,
    currentStreak: 0,
    bestStreak: 0,
    xp: 0,
    daysActive: [],
    letters: {},
    learnedLetters: [],
    masteredLetters: [],
    achievements: {
      "first-correct": { unlocked: false },
      "five-streak": { unlocked: false },
      "ten-learned": { unlocked: false },
      "hundred-xp": { unlocked: false },
      "perfect-round": { unlocked: false },
      "seven-day-streak": { unlocked: false },
    },
    sessionsCompleted: 0,
  };
}
