import { QuizQuestion } from "../types";

type LetterCardProps = {
  question: QuizQuestion;
  compact?: boolean;
};

export function LetterCard({ question, compact = false }: LetterCardProps) {
  if (compact) {
    return (
      <div className="text-left space-y-4">
        <h1 className="font-headline text-7xl font-extrabold tracking-tighter text-on-surface md:text-8xl">
          {question.uppercase}
          {question.lowercase}
        </h1>
        <p className="max-w-md text-xl leading-relaxed text-on-surface-variant">
          Wie wird dieser kyrillische Buchstabe im Deutschen ausgesprochen?
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface-container-lowest shadow-ambient">
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,#bac3ff_0%,transparent_55%)]" />
      </div>
      <div className="relative z-10 flex aspect-[4/3] items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-[8rem] font-extrabold leading-none tracking-tighter text-on-surface">
            {question.uppercase} {question.lowercase}
          </h1>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-on-surface-variant">
            Cyrillic Alphabet
          </p>
        </div>
      </div>
    </div>
  );
}
