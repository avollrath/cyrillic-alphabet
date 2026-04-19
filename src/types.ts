export type AppView = "landing" | "learn" | "dashboard" | "achievements" | "session-complete";

export type LetterStats = {
  correct: number;
  wrong: number;
  streak: number;
};

export type Letter = {
  id: string;
  uppercase: string;
  lowercase: string;
  answer: string;
  transliteration: string;
  category: "vowel" | "consonant" | "special";
  example?: string;
  exampleWord?: string;
  exampleTranslation?: string;
  stats: LetterStats;
  mastered: boolean;
};

export type AchievementId =
  | "first-correct"
  | "five-streak"
  | "ten-learned"
  | "hundred-xp"
  | "perfect-round"
  | "seven-day-streak";

export type Achievement = {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
};

export type ProgressState = {
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
  currentStreak: number;
  bestStreak: number;
  xp: number;
  daysActive: string[];
  letters: Record<string, LetterStats>;
  learnedLetters: string[];
  masteredLetters: string[];
  achievements: Record<AchievementId, { unlocked: boolean; unlockedAt?: string }>;
  sessionsCompleted: number;
  lastSession?: SessionSnapshot;
};

export type QuestionOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  letterId: string;
  uppercase: string;
  lowercase: string;
  transliteration: string;
  answer: string;
  exampleWord?: string;
  exampleTranslation?: string;
  options: QuestionOption[];
};

export type QuestionResult = {
  selectedOptionId: string;
  correctOptionId: string;
  correct: boolean;
};

export type SessionSnapshot = {
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  xpEarned: number;
  bonusXp: number;
  newlyLearned: string[];
  newlyMastered: string[];
  completedAt: string;
};
