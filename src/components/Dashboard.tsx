import { Achievement, Letter, ProgressState } from "../types";
import { ProgressBar } from "./ProgressBar";
import { StatsCard } from "./StatsCard";

type DashboardProps = {
  progress: ProgressState;
  letters: Letter[];
  achievements: Achievement[];
  currentDayStreak: number;
  bestDayStreak: number;
  onResume: () => void;
  onReset: () => void;
};

function formatDays(value: number) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue} ${safeValue === 1 ? "Tag" : "Tage"}`;
}

export function Dashboard({
  progress,
  letters,
  achievements,
  currentDayStreak,
  bestDayStreak,
  onResume,
  onReset,
}: DashboardProps) {
  const vowels = letters.filter((letter) => letter.category === "vowel");
  const consonants = letters.filter((letter) => letter.category === "consonant");
  const special = letters.filter((letter) => letter.category === "special");
  const learnedRate = Math.round((progress.learnedLetters.length / letters.length) * 100);
  const recentAchievements = achievements.filter((item) => item.unlocked).slice(-3).reverse();

  const categoryCompletion = (group: Letter[]) =>
    group.length === 0
      ? 0
      : Math.round((group.filter((letter) => progress.learnedLetters.includes(letter.id)).length / group.length) * 100);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight text-on-surface lg:text-5xl">
            Dein Fortschritt
          </h1>
          <p className="max-w-2xl text-lg text-on-surface-variant">
            Hier siehst du, wie viele Buchstaben du schon gelernt hast, wie sicher du antwortest und wie weit du in
            deinem Kurs gekommen bist.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onResume}
            className="bg-primary-gradient rounded-2xl px-6 py-3 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Weiterlernen
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-2xl bg-surface-container-lowest px-6 py-3 font-bold text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Fortschritt zurücksetzen
          </button>
        </div>
      </header>

      <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon="target"
          value={`${progress.accuracy}%`}
          label="Trefferquote"
          accent="primary"
          meta={`${progress.correctAnswers}/${progress.totalAnswers || 0}`}
        />
        <StatsCard
          icon="spellcheck"
          value={`${learnedRate}%`}
          label="Buchstaben gelernt"
          accent="secondary"
          meta={`${progress.learnedLetters.length}/${letters.length}`}
        />
        <StatsCard
          icon="local_fire_department"
          value={formatDays(currentDayStreak)}
          label="Aktuelle Serie"
          accent="gradient"
          meta={`${formatDays(bestDayStreak)} am Stück`}
        />
        <StatsCard
          icon="military_tech"
          value={progress.xp.toLocaleString("de-DE")}
          label="Gesamtpunkte"
          accent="tertiary"
          meta={`${progress.sessionsCompleted} Runden`}
        />
      </section>

      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-[2rem] bg-surface-container-low p-8 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-headline text-xl font-bold">Buchstabengruppen</h3>
            <div className="flex gap-2">
              <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
                Konsonanten
              </span>
              <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-bold text-on-primary-container">
                Vokale
              </span>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <span className="block font-headline text-lg font-bold">Vokale (А, Е, Ё, И, О...)</span>
                  <span className="text-sm text-on-surface-variant">Schon gut unterwegs</span>
                </div>
                <span className="font-headline text-2xl font-bold text-primary">{categoryCompletion(vowels)}%</span>
              </div>
              <ProgressBar value={categoryCompletion(vowels)} color="primary" thin={false} />
            </div>
            <div>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <span className="block font-headline text-lg font-bold">Konsonanten (Б, В, Г, Д, Ж...)</span>
                  <span className="text-sm text-on-surface-variant">Gerade im Fokus</span>
                </div>
                <span className="font-headline text-2xl font-bold text-secondary">{categoryCompletion(consonants)}%</span>
              </div>
              <ProgressBar value={categoryCompletion(consonants)} color="secondary" thin={false} />
            </div>
            <div>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <span className="block font-headline text-lg font-bold">Sonderzeichen (Ъ, Ь)</span>
                  <span className="text-sm text-on-surface-variant">Noch offen</span>
                </div>
                <span className="font-headline text-2xl font-bold text-outline">{categoryCompletion(special)}%</span>
              </div>
              <ProgressBar value={categoryCompletion(special)} color="secondary" thin={false} />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-sm">
          <h3 className="mb-6 font-headline text-xl font-bold">Neueste Erfolge</h3>
          <div className="space-y-6">
            {recentAchievements.length > 0 ? (
              recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center rounded-2xl bg-surface p-4">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                    <span className="material-symbols-outlined text-indigo-600" style={{ fontVariationSettings: '"FILL" 1' }}>
                      {achievement.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{achievement.title}</h4>
                    <p className="text-xs text-on-surface-variant">{achievement.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">
                Deine Erfolge erscheinen automatisch, sobald du Fragen beantwortest und Lernziele erreichst.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-container p-10">
        <div className="relative z-10">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">Als Nächstes</span>
          <h2 className="mb-4 font-headline text-3xl font-extrabold">Weitere Buchstaben festigen</h2>
          <p className="mb-8 max-w-sm text-on-surface-variant">
            Dir fehlen noch {Math.max(0, letters.length - progress.masteredLetters.length)} Buchstaben, bis du das
            ganze Alphabet sicher beherrschst.
          </p>
          <button
            type="button"
            onClick={onResume}
            className="bg-primary-gradient rounded-2xl px-8 py-4 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Weiterlernen
          </button>
        </div>
        <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <span className="absolute right-8 top-12 font-headline text-[120px] font-bold text-primary/5">Д</span>
      </div>
    </div>
  );
}
