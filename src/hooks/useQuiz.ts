import { useEffect, useMemo, useState } from "react";
import { Letter, QuestionResult, QuizQuestion, SessionSnapshot } from "../types";
import { buildQuestion, pickNextLetter, percentage } from "../utils/quiz";

const SESSION_LENGTH = 10;

export function useQuiz(letters: Letter[]) {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [result, setResult] = useState<QuestionResult | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [newlyMastered, setNewlyMastered] = useState<string[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [sessionFinished, setSessionFinished] = useState(false);

  const progressPercent = useMemo(
    () => percentage(questionsAnswered, SESSION_LENGTH),
    [questionsAnswered],
  );

  const hydrateQuestion = () => {
    const letter = pickNextLetter(letters);
    setQuestion(buildQuestion(letter, letters));
    setSelectedOptionId(null);
    setResult(null);
  };

  useEffect(() => {
    if (letters.length > 0 && !question) {
      hydrateQuestion();
    }
  }, [letters, question]);

  const submitAnswer = (currentStreak: number) => {
    if (!question || !selectedOptionId || result) {
      return null;
    }

    const correctOptionId = question.options.find((option) => option.label === question.answer)?.id ?? "";
    const correct = selectedOptionId === correctOptionId;
    const streakBonus = correct ? Math.min((currentStreak + 1) * 2, 10) : 0;
    const xpAwarded = correct ? 10 + streakBonus : 0;

    setResult({ selectedOptionId, correctOptionId, correct });
    setSessionXp((current) => current + xpAwarded);
    setQuestionsAnswered((current) => current + 1);
    setCompletedLetters((current) =>
      current.includes(question.letterId) ? current : [...current, question.letterId],
    );
    setSessionCorrect((current) => current + (correct ? 1 : 0));
    setSessionWrong((current) => current + (correct ? 0 : 1));

    return {
      letterId: question.letterId,
      correct,
      xpAwarded,
    };
  };

  const nextQuestion = (masteredLetterIds: string[] = []) => {
    setNewlyMastered((current) => [...new Set([...current, ...masteredLetterIds])]);

    if (questionsAnswered >= SESSION_LENGTH) {
      setSessionFinished(true);
      return;
    }

    hydrateQuestion();
  };

  const resetSession = () => {
    setQuestion(null);
    setSelectedOptionId(null);
    setResult(null);
    setSessionCorrect(0);
    setSessionWrong(0);
    setSessionXp(0);
    setCompletedLetters([]);
    setNewlyMastered([]);
    setQuestionsAnswered(0);
    setSessionFinished(false);
  };

  const getSnapshot = (): SessionSnapshot => {
    const completionBonus = 15;
    const perfectBonus = sessionWrong === 0 ? 20 : 0;
    const bonusXp = completionBonus + perfectBonus;
    const xpEarned = sessionXp + bonusXp;
    return {
      correctCount: sessionCorrect,
      wrongCount: sessionWrong,
      accuracy: percentage(sessionCorrect, Math.max(sessionCorrect + sessionWrong, 1)),
      xpEarned,
      bonusXp,
      newlyLearned: completedLetters,
      newlyMastered,
      completedAt: new Date().toISOString(),
    };
  };

  return {
    question,
    selectedOptionId,
    setSelectedOptionId,
    result,
    submitAnswer,
    nextQuestion,
    progressPercent,
    sessionFinished,
    questionsAnswered,
    sessionCorrect,
    sessionWrong,
    sessionXp,
    resetSession,
    getSnapshot,
  };
}
