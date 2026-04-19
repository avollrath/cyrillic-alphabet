import { Achievement, Letter, ProgressState } from "../types";
import { ProgressBar } from "./ProgressBar";
import { StatsCard } from "./StatsCard";

type DashboardProps = {
  progress: ProgressState;
  letters: Letter[];
  achievements: Achievement[];
  onResume: () => void;
};

export function Dashboard({ progress, letters, achievements, onResume }: DashboardProps) {
  const vowels = letters.filter((letter) => letter.category === "vowel");
  const consonants = letters.filter((letter) => letter.category === "consonant");
  const special = letters.filter((letter) => letter.category === "special");
  const learnedRate = Math.round((progress.learnedLetters.length / letters.length) * 100);
  const recentAchievements = achievements.filter((item) => item.unlocked).slice(-3).reverse();

  const categoryCompletion = (group: Letter[]) =>
    group.length === 0 ? 0 : Math.round((group.filter((letter) => letter.mastered).length / group.length) * 100);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-12">
        <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight text-on-surface lg:text-5xl">
          Dein Fortschritt
        </h1>
        <p className="max-w-2xl text-lg text-on-surface-variant">
          Die Reise zur Meisterschaft der russischen Sprache. Jede Einheit ist ein Schritt näher zur Kunst der fließenden Konversation.
        </p>
      </header>

      <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon="target"
          value={`${progress.accuracy}%`}
          label="Gesamtpräzision"
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
          value={`${progress.bestStreak} Tage`}
          label="Tägliche Serie"
          accent="gradient"
          meta="FEUER"
        />
        <StatsCard
          icon="military_tech"
          value={progress.xp.toLocaleString("de-DE")}
          label="Gesamt XP"
          accent="tertiary"
          meta={`Level ${Math.max(1, Math.floor(progress.xp / 150) + 1)}`}
        />
      </section>

      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-[2rem] bg-surface-container-low p-8 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-headline text-xl font-bold">Alphabet-Gruppen</h3>
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
                  <span className="text-sm text-on-surface-variant">Fortgeschritten</span>
                </div>
                <span className="font-headline text-2xl font-bold text-primary">{categoryCompletion(vowels)}%</span>
              </div>
              <ProgressBar value={categoryCompletion(vowels)} color="primary" thin={false} />
            </div>
            <div>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <span className="block font-headline text-lg font-bold">Konsonanten (Б, В, Г, Д, Ж...)</span>
                  <span className="text-sm text-on-surface-variant">In Bearbeitung</span>
                </div>
                <span className="font-headline text-2xl font-bold text-secondary">{categoryCompletion(consonants)}%</span>
              </div>
              <ProgressBar value={categoryCompletion(consonants)} color="secondary" thin={false} />
            </div>
            <div>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <span className="block font-headline text-lg font-bold">Sonderzeichen (Ъ, Ь)</span>
                  <span className="text-sm text-on-surface-variant">Noch nicht gestartet</span>
                </div>
                <span className="font-headline text-2xl font-bold text-outline">{categoryCompletion(special)}%</span>
              </div>
              <ProgressBar value={categoryCompletion(special)} color="secondary" thin={false} />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-sm">
          <h3 className="mb-6 font-headline text-xl font-bold">Letzte Erfolge</h3>
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
              <p className="text-sm text-on-surface-variant">Die ersten Erfolge erscheinen nach deinen ersten Antworten.</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-container p-10">
        <div className="relative z-10">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">Nächster Meilenstein</span>
          <h2 className="mb-4 font-headline text-3xl font-extrabold">Das kyrillische Skript meistern</h2>
          <p className="mb-8 max-w-sm text-on-surface-variant">
            Dir fehlen nur noch {Math.max(0, letters.length - progress.masteredLetters.length)} Buchstaben, um das gesamte Basis-Alphabet abzuschließen.
          </p>
          <button
            type="button"
            onClick={onResume}
            className="bg-primary-gradient rounded-2xl px-8 py-4 font-bold text-white shadow-xl"
          >
            Lektion fortsetzen
          </button>
        </div>
        <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <span className="absolute right-8 top-12 font-headline text-[120px] font-bold text-primary/5">Д</span>
      </div>
    </div>
  );
}
