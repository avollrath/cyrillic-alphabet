import { Letter, LetterStats, ProgressState, QuestionOption, QuizQuestion } from "../types";

export function computeAccuracy(stats: LetterStats): number {
  const total = stats.correct + stats.wrong;
  return total === 0 ? 0 : Math.round((stats.correct / total) * 100);
}

export function isMastered(stats: LetterStats): boolean {
  return stats.correct >= 3 && computeAccuracy(stats) >= 80;
}

export function mergeLetterStats(letters: Letter[], progress: ProgressState): Letter[] {
  return letters.map((letter) => {
    const stats = progress.letters[letter.id] ?? letter.stats;
    return {
      ...letter,
      stats,
      mastered: isMastered(stats),
    };
  });
}

export function shuffle<T>(items: T[]): T[] {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
}

export function pickNextLetter(letters: Letter[]): Letter {
  const unmastered = letters.filter((letter) => !letter.mastered);
  const mastered = letters.filter((letter) => letter.mastered);
  const pool = unmastered.length > 0 && (mastered.length === 0 || Math.random() < 0.8) ? unmastered : mastered;
  const weighted = [...pool].sort((left, right) => {
    const leftScore = left.stats.correct - left.stats.wrong + (left.mastered ? 2 : 0);
    const rightScore = right.stats.correct - right.stats.wrong + (right.mastered ? 2 : 0);
    return leftScore - rightScore;
  });
  return weighted[Math.floor(Math.random() * Math.min(weighted.length, 6))] ?? letters[0];
}

export function buildQuestion(letter: Letter, letters: Letter[]): QuizQuestion {
  const distractors = shuffle(
    letters
      .filter((candidate) => candidate.id !== letter.id && candidate.answer !== letter.answer)
      .map((candidate) => candidate.answer),
  )
    .filter((answer, index, arr) => arr.indexOf(answer) === index)
    .slice(0, 3);

  const options = shuffle<QuestionOption>(
    [letter.answer, ...distractors].map((label) => ({
      id: `${letter.id}-${label}`,
      label,
    })),
  );

  return {
    letterId: letter.id,
    uppercase: letter.uppercase,
    lowercase: letter.lowercase,
    transliteration: letter.transliteration,
    answer: letter.answer,
    options,
  };
}

export function percentage(value: number, total: number): number {
  return total === 0 ? 0 : Math.round((value / total) * 100);
}
