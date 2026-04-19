import { QuestionResult, QuizQuestion } from "../types";

type FeedbackBannerProps = {
  question: QuizQuestion;
  result: QuestionResult;
  onContinue: () => void;
};

export function FeedbackBanner({ question, result, onContinue }: FeedbackBannerProps) {
  const correct = result.correct;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 px-6 py-8 shadow-[0_-8px_32px_rgba(0,0,0,0.06)] transition-transform duration-500 ${
        correct ? "bg-white" : "bg-error-container/10 premium-blur"
      }`}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-5">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
              correct ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
            }`}
          >
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: correct ? '"FILL" 1' : undefined }}>
              {correct ? "check_circle" : "auto_awesome"}
            </span>
          </div>
          <div>
            <h3 className={`font-headline text-2xl font-bold ${correct ? "text-secondary" : "text-on-background"}`}>
              {correct ? "Richtig! Gut gemacht!" : "Nicht ganz."}
            </h3>
            <p className="text-lg text-on-surface-variant">
              {correct
                ? `Das russische '${question.uppercase}' entspricht dem deutschen '${question.answer}'.`
                : `Die richtige Aussprache ist "${question.answer}". Kopf hoch, Russisch braucht Übung!`}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="bg-primary-gradient flex items-center gap-2 rounded-xl px-12 py-4 font-headline text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
        >
          Weiter
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
