import { AnswerButton } from "./AnswerButton";
import { LetterCard } from "./LetterCard";
import { ProgressBar } from "./ProgressBar";
import { QuestionResult, QuizQuestion } from "../types";

type QuizCardProps = {
  question: QuizQuestion;
  selectedOptionId: string | null;
  result: QuestionResult | null;
  progressPercent: number;
  streak: number;
  xp: number;
  onSelect: (optionId: string) => void;
};

export function QuizCard({
  question,
  selectedOptionId,
  result,
  progressPercent,
  streak,
  xp,
  onSelect,
}: QuizCardProps) {
  const feedbackLayout = Boolean(result);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Lektion 1</span>
            <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
              Das Alphabet
            </h2>
          </div>
          <span className="text-sm font-semibold text-on-surface-variant">
            {Math.round(progressPercent / 10)} / 10 abgeschlossen
          </span>
        </div>
        <ProgressBar value={progressPercent} color={feedbackLayout ? "secondary" : "primary"} />
      </div>

      {feedbackLayout ? (
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-surface-container-low p-12">
            <div className="mb-8 text-xs uppercase tracking-widest text-on-surface-variant">
              Wählen Sie die richtige Aussprache
            </div>
            <div className="mb-6 font-headline text-9xl font-extrabold tracking-tighter text-on-surface">
              {question.uppercase} {question.lowercase}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-6 py-2 text-primary">
              <span className="material-symbols-outlined text-lg">volume_up</span>
              <span>Anhören</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {question.options.map((option, index) => (
              <AnswerButton
                key={option.id}
                option={option}
                index={index}
                selected={selectedOptionId === option.id}
                result={result}
                disabled
                layout="feedback"
                onClick={() => undefined}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>
                local_fire_department
              </span>
              <span className="font-headline text-sm font-bold">Serie: {streak}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                stars
              </span>
              <span className="font-headline text-sm font-bold">{xp} XP</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10">
            <LetterCard question={question} />
            <div className="text-center">
              <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface">
                Wähle die richtige deutsche Aussprache
              </h3>
              <p className="text-on-surface-variant">
                Identify the correct phonetic sound for this character.
              </p>
            </div>
            <div className="grid w-full max-w-md grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <AnswerButton
                  key={option.id}
                  option={option}
                  index={index}
                  selected={selectedOptionId === option.id}
                  onClick={() => onSelect(option.id)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
