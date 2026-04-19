import clsx from "clsx";
import { QuestionOption, QuestionResult } from "../types";

type AnswerButtonProps = {
  option: QuestionOption;
  index: number;
  selected: boolean;
  result?: QuestionResult | null;
  disabled?: boolean;
  layout?: "grid" | "feedback";
  onClick: () => void;
};

export function AnswerButton({
  option,
  index,
  selected,
  result,
  disabled,
  layout = "grid",
  onClick,
}: AnswerButtonProps) {
  const isCorrect = result?.correctOptionId === option.id;
  const isUserChoice = result?.selectedOptionId === option.id;

  if (layout === "feedback") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled
        className={clsx(
          "flex w-full items-center justify-between rounded-xl p-6 text-left transition-all duration-300",
          isCorrect && "bg-surface-container-lowest ring-2 ring-secondary/40",
          isUserChoice && !isCorrect && "bg-error-container/30 ring-1 ring-error/20",
          !isCorrect && !isUserChoice && "pointer-events-none bg-surface-container-lowest opacity-40 grayscale",
        )}
      >
        <div className="flex items-center gap-6">
          <div
            className={clsx(
              "flex h-12 w-12 items-center justify-center rounded-lg font-headline font-bold",
              isCorrect && "bg-secondary/10 text-secondary",
              isUserChoice && !isCorrect && "bg-error/10 text-error",
              !isCorrect && !isUserChoice && "bg-surface-container text-on-surface-variant",
            )}
          >
            {String.fromCharCode(65 + index)}
          </div>
          <div>
            <div className="font-headline text-2xl font-bold text-on-surface">{option.label}</div>
            <div
              className={clsx(
                "text-sm uppercase tracking-wider",
                isCorrect && "font-medium text-secondary",
                isUserChoice && !isCorrect && "font-medium text-error/80",
              )}
            >
              {isCorrect ? "Richtige Antwort" : isUserChoice ? "Deine Auswahl" : ""}
            </div>
          </div>
        </div>
        {isCorrect ? (
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
            check_circle
          </span>
        ) : isUserChoice ? (
          <span className="material-symbols-outlined text-error">cancel</span>
        ) : null}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "group relative flex min-h-40 flex-col items-center justify-center rounded-2xl bg-surface-container-lowest p-8 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60",
        selected ? "bg-primary/5 ring-2 ring-primary" : "hover:bg-primary-fixed/30",
      )}
      aria-pressed={selected}
    >
      <span className={clsx("font-headline text-2xl font-bold", selected ? "text-primary" : "text-on-surface")}>
        {option.label}
      </span>
      {selected ? (
        <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary/70">Ausgewählt</span>
      ) : null}
    </button>
  );
}
