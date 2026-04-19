import { useMemo } from "react";
import { russianAlphabet } from "../data/alphabet";
import { useLocalStorageState } from "./useLocalStorageState";
import { createDefaultProgress, STORAGE_KEY } from "../utils/storage";
import { Letter, ProgressState, SessionSnapshot } from "../types";
import { mergeLetterStats, percentage } from "../utils/quiz";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function differenceInDays(left: string, right: string) {
  const leftDate = new Date(`${left}T00:00:00`);
  const rightDate = new Date(`${right}T00:00:00`);
  return Math.round((leftDate.getTime() - rightDate.getTime()) / 86400000);
}

function getDayStreaks(daysActive: string[]) {
  const sortedDays = [...new Set(daysActive)].sort();

  if (sortedDays.length === 0) {
    return { currentDayStreak: 0, bestDayStreak: 0 };
  }

  let bestDayStreak = 1;
  let runningBest = 1;

  for (let index = 1; index < sortedDays.length; index += 1) {
    if (differenceInDays(sortedDays[index], sortedDays[index - 1]) === 1) {
      runningBest += 1;
      bestDayStreak = Math.max(bestDayStreak, runningBest);
    } else {
      runningBest = 1;
    }
  }

  let currentDayStreak = 1;
  for (let index = sortedDays.length - 1; index > 0; index -= 1) {
    if (differenceInDays(sortedDays[index], sortedDays[index - 1]) === 1) {
      currentDayStreak += 1;
    } else {
      break;
    }
  }

  const today = todayKey();
  const mostRecentDay = sortedDays[sortedDays.length - 1];

  if (differenceInDays(today, mostRecentDay) > 1) {
    currentDayStreak = 0;
  }

  return { currentDayStreak, bestDayStreak };
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorageState<ProgressState>(STORAGE_KEY, createDefaultProgress());

  const letters = useMemo(() => mergeLetterStats(russianAlphabet, progress), [progress]);
  const { currentDayStreak, bestDayStreak } = useMemo(() => getDayStreaks(progress.daysActive), [progress.daysActive]);

  const markAnswer = (letter: Letter, correct: boolean, xpAwarded: number) => {
    setProgress((current) => {
      const date = todayKey();
      const previous = current.letters[letter.id] ?? { correct: 0, wrong: 0, streak: 0 };
      const nextStats = {
        correct: previous.correct + (correct ? 1 : 0),
        wrong: previous.wrong + (correct ? 0 : 1),
        streak: correct ? previous.streak + 1 : 0,
      };
      const learnedLetters = current.learnedLetters.includes(letter.id)
        ? current.learnedLetters
        : [...current.learnedLetters, letter.id];
      const accuracy = percentage(current.correctAnswers + (correct ? 1 : 0), current.totalAnswers + 1);
      const daysActive = current.daysActive.includes(date) ? current.daysActive : [...current.daysActive, date];
      const masteredLetters = mergeLetterStats(russianAlphabet, {
        ...current,
        letters: { ...current.letters, [letter.id]: nextStats },
        learnedLetters,
        totalAnswers: current.totalAnswers + 1,
        correctAnswers: current.correctAnswers + (correct ? 1 : 0),
        accuracy,
      })
        .filter((item) => item.mastered)
        .map((item) => item.id);

      return {
        ...current,
        totalAnswers: current.totalAnswers + 1,
        correctAnswers: current.correctAnswers + (correct ? 1 : 0),
        accuracy,
        currentStreak: correct ? current.currentStreak + 1 : 0,
        bestStreak: correct ? Math.max(current.bestStreak, current.currentStreak + 1) : current.bestStreak,
        xp: current.xp + xpAwarded,
        daysActive,
        letters: {
          ...current.letters,
          [letter.id]: nextStats,
        },
        learnedLetters,
        masteredLetters,
      };
    });
  };

  const finishSession = (session: SessionSnapshot) => {
    setProgress((current) => ({
      ...current,
      xp: current.xp + session.bonusXp,
      sessionsCompleted: current.sessionsCompleted + 1,
      lastSession: session,
    }));
  };

  const unlockAchievement = (achievementId: keyof ProgressState["achievements"]) => {
    setProgress((current) => {
      if (current.achievements[achievementId]?.unlocked) {
        return current;
      }
      return {
        ...current,
        achievements: {
          ...current.achievements,
          [achievementId]: { unlocked: true, unlockedAt: new Date().toISOString() },
        },
      };
    });
  };

  const resetProgress = () => {
    setProgress(createDefaultProgress());
  };

  return {
    progress,
    letters,
    currentDayStreak,
    bestDayStreak,
    markAnswer,
    finishSession,
    unlockAchievement,
    resetProgress,
    setProgress,
  };
}
