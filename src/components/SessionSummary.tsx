import { Letter, SessionSnapshot } from "../types";

type SessionSummaryProps = {
  snapshot: SessionSnapshot;
  letters: Letter[];
  onNextRound: () => void;
  onDashboard: () => void;
};

export function SessionSummary({ snapshot, letters, onNextRound, onDashboard }: SessionSummaryProps) {
  const newlyLearned = letters.filter((letter) => snapshot.newlyLearned.includes(letter.id)).slice(0, 6);
  const completion = Math.round((letters.filter((letter) => letter.mastered).length / letters.length) * 100);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-8 md:col-span-8 md:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative z-10">
            <span className="mb-6 inline-block rounded-full bg-secondary-container px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Runde abgeschlossen
            </span>
            <h1 className="mb-4 font-headline text-4xl font-extrabold tracking-tighter text-on-surface md:text-6xl">
              Gut gemacht!
            </h1>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-on-surface-variant">
              Du hast diese Runde abgeschlossen und deinen Lernstand weiter ausgebaut.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={onNextRound}
                className="bg-primary-gradient flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-headline text-lg font-bold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Nächste Runde
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={onDashboard}
                className="rounded-xl bg-surface px-8 py-4 font-headline text-lg font-bold text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Zum Fortschritt
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:col-span-4">
          <div className="rounded-3xl bg-surface-container-lowest p-8 text-center">
            <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full border-8 border-surface-container">
              <div>
                <div className="font-headline text-3xl font-extrabold text-on-surface">
                  {letters.filter((letter) => letter.mastered).length}/{letters.length}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Buchstaben</div>
              </div>
            </div>
            <p className="font-headline text-2xl font-bold text-on-surface">Gesamtfortschritt</p>
            <p className="mt-1 text-sm text-on-surface-variant">{completion}% des Alphabets sind bereits gefestigt.</p>
          </div>
          <div className="rounded-3xl bg-surface-container-low p-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4 rounded-2xl bg-surface-container-lowest p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Punkte</p>
                  <p className="font-headline text-2xl font-extrabold">+{snapshot.xpEarned}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-surface-container-lowest p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container">
                  <span className="material-symbols-outlined">target</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Trefferquote</p>
                  <p className="font-headline text-2xl font-extrabold">{snapshot.accuracy}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-surface-container-lowest p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined">star</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Neu gemeistert</p>
                  <p className="font-headline text-2xl font-extrabold">{snapshot.newlyMastered.length} Buchstaben</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-on-surface-variant md:text-left">
          Neu geübte Zeichen
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {newlyLearned.map((letter) => (
            <div key={letter.id} className="flex flex-col items-center rounded-2xl bg-surface-container-lowest p-6">
              <span className="mb-2 font-headline text-4xl font-extrabold text-primary">{letter.uppercase}</span>
              <span className="text-xs font-bold text-on-surface-variant">
                {letter.transliteration} ({letter.answer})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
