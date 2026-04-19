import clsx from "clsx";
import { Achievement } from "../types";

type AchievementCardProps = {
  achievement: Achievement;
  featured?: boolean;
};

export function AchievementCard({ achievement, featured = false }: AchievementCardProps) {
  if (featured) {
    return (
      <div className="flex flex-col items-center gap-8 rounded-3xl bg-surface-container-lowest p-8 shadow-sm md:flex-row">
        <div className="relative">
          <div className="bg-primary-gradient flex h-40 w-40 items-center justify-center rounded-full text-white">
            <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              {achievement.icon}
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-secondary">
            {achievement.unlocked ? "Freigeschaltet" : "Gesperrt"}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="mb-2 font-headline text-3xl font-bold text-on-surface">{achievement.title}</h3>
          <p className="mb-6 text-lg text-on-surface-variant">{achievement.description}</p>
          <span className="text-sm font-semibold text-secondary">
            {achievement.unlockedAt
              ? `Vollendet am ${new Date(achievement.unlockedAt).toLocaleDateString("de-DE")}`
              : "Noch nicht freigeschaltet"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "rounded-3xl p-6 transition-shadow",
        achievement.unlocked
          ? "bg-surface-container-lowest shadow-sm"
          : "bg-surface-container-low/50 opacity-70 grayscale",
      )}
    >
      <div
        className={clsx(
          "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl",
          achievement.unlocked ? "bg-primary-gradient text-white" : "bg-surface-container-highest text-outline",
        )}
      >
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: achievement.unlocked ? '"FILL" 1' : undefined }}>
          {achievement.icon}
        </span>
      </div>
      <h4 className="mb-2 font-headline text-xl font-bold text-on-surface">{achievement.title}</h4>
      <p className="text-sm leading-relaxed text-on-surface-variant">{achievement.description}</p>
    </div>
  );
}
