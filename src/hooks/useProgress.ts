import { useMemo } from "react";
import { russianAlphabet } from "../data/alphabet";
import { useLocalStorageState } from "./useLocalStorageState";
import { createDefaultProgress, STORAGE_KEY } from "../utils/storage";
import { Letter, ProgressState, SessionSnapshot } from "../types";
import { mergeLetterStats, percentage } from "../utils/quiz";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorageState<ProgressState>(STORAGE_KEY, createDefaultProgress());

  const letters = useMemo(() => mergeLetterStats(russianAlphabet, progress), [progress]);

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

  return {
    progress,
    letters,
    markAnswer,
    finishSession,
    unlockAchievement,
    setProgress,
  };
}
