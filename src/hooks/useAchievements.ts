import { useEffect, useState } from "react";
import { achievementDefinitions } from "../data/achievements";
import { Achievement, AchievementId, ProgressState, SessionSnapshot } from "../types";

type Popup = Achievement & { visible: boolean };

export function useAchievements(
  progress: ProgressState,
  unlockAchievement: (id: AchievementId) => void,
  latestSession: SessionSnapshot | null,
) {
  const [queue, setQueue] = useState<Popup[]>([]);

  useEffect(() => {
    const unlocks: AchievementId[] = [];

    if (progress.correctAnswers >= 1) unlocks.push("first-correct");
    if (progress.bestStreak >= 5) unlocks.push("five-streak");
    if (progress.learnedLetters.length >= 10) unlocks.push("ten-learned");
    if (progress.xp >= 100) unlocks.push("hundred-xp");
    if (progress.daysActive.length >= 7) unlocks.push("seven-day-streak");
    if (latestSession && latestSession.wrongCount === 0 && latestSession.correctCount > 0) unlocks.push("perfect-round");

    unlocks.forEach((id) => {
      if (!progress.achievements[id].unlocked) {
        unlockAchievement(id);
        const definition = achievementDefinitions.find((item) => item.id === id);
        if (definition) {
          setQueue((current) => [...current, { ...definition, unlocked: true, visible: true }]);
        }
      }
    });
  }, [latestSession, progress, unlockAchievement]);

  useEffect(() => {
    if (queue.length === 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setQueue((current) => current.slice(1));
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [queue]);

  const achievements = achievementDefinitions.map((definition) => ({
    ...definition,
    unlocked: progress.achievements[definition.id].unlocked,
    unlockedAt: progress.achievements[definition.id].unlockedAt,
  }));

  return {
    achievements,
    popup: queue[0] ?? null,
  };
}
