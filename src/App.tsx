import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AchievementCard } from "./components/AchievementCard";
import { Dashboard } from "./components/Dashboard";
import { FeedbackBanner } from "./components/FeedbackBanner";
import { Layout } from "./components/Layout";
import { QuizCard } from "./components/QuizCard";
import { SessionSummary } from "./components/SessionSummary";
import { useAchievements } from "./hooks/useAchievements";
import { useProgress } from "./hooks/useProgress";
import { useQuiz } from "./hooks/useQuiz";
import { SessionSnapshot } from "./types";
import { isMastered } from "./utils/quiz";

function LandingScreen() {
  const navigate = useNavigate();

  return (
    <Layout footer>
      <main className="relative flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center overflow-hidden px-6 py-20 md:px-12">
        <div className="pointer-events-none absolute right-[-5%] top-[-10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px]" />

        <div className="z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col space-y-8 text-center lg:pr-12 lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-primary-fixed-variant">
                Kurs: Russisch
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-outline-variant/40" />
              <span className="text-sm font-medium text-on-surface-variant">Stufe A1</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-extrabold leading-[1.1] tracking-tighter text-on-surface md:text-6xl lg:text-7xl">
                Lerne das russische <span className="text-gradient">Alphabet</span>.
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl lg:mx-0">
                Meistere das kyrillische Alphabet mit unserer modernen, wissenschaftlich fundierten Methode. Schnell,
                effektiv und unterhaltsam.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={() => navigate("/learn")}
                className="bg-primary-gradient flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-bold text-on-primary transition-all hover:opacity-90"
              >
                Jetzt starten
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button type="button" className="rounded-2xl bg-surface-container-lowest px-8 py-4 font-semibold text-on-surface">
                Wie es funktioniert
              </button>
            </div>
          </div>

          <div className="relative flex aspect-square w-full items-center justify-center md:aspect-video lg:aspect-square">
            <div className="absolute h-[80%] w-[80%] rounded-full border border-outline-variant/10" />
            <div className="absolute h-[60%] w-[60%] rounded-full border border-outline-variant/10" />

            <div className="relative z-20 w-[320px] -rotate-3 rounded-2xl bg-surface-container-lowest p-8 shadow-float transition-transform duration-500 hover:rotate-0">
              <div className="mb-8 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container">
                  <span className="material-symbols-outlined text-on-secondary-container">volume_up</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Lektion 01</span>
                  <p className="text-xs font-medium text-primary">Vokale</p>
                </div>
              </div>

              <div className="mb-10 text-center">
                <h2 className="mb-2 font-headline text-7xl font-extrabold text-on-surface">Д</h2>
                <p className="text-lg font-medium text-on-surface-variant">/d/ — wie in „Dach“</p>
              </div>

              <div className="space-y-4">
                <div className="h-2 w-full rounded-full bg-surface-container-low">
                  <div className="h-2 w-[40%] rounded-full bg-secondary" />
                </div>
                <p className="text-center text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Fortschritt: 40%
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { progress, letters, markAnswer, finishSession, unlockAchievement } = useProgress();
  const quiz = useQuiz(letters);
  const [latestSession, setLatestSession] = useState<SessionSnapshot | null>(null);
  const [pendingMasteredIds, setPendingMasteredIds] = useState<string[]>([]);
  const { achievements, popup } = useAchievements(progress, unlockAchievement, latestSession);

  const activeQuestionLetter = useMemo(
    () => letters.find((letter) => letter.id === quiz.question?.letterId),
    [letters, quiz.question],
  );

  useEffect(() => {
    if (!quiz.question) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (location.pathname !== "/learn" || quiz.result) {
        return;
      }

      const currentQuestion = quiz.question;
      if (!currentQuestion) {
        return;
      }

      const index = Number(event.key) - 1;
      if (index >= 0 && index < 4) {
        const option = currentQuestion.options[index];
        if (option) {
          quiz.setSelectedOptionId(option.id);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [location.pathname, quiz.question, quiz.result, quiz.setSelectedOptionId]);

  useEffect(() => {
    if (!quiz.sessionFinished) {
      return;
    }

    const snapshot = quiz.getSnapshot();
    finishSession(snapshot);
    setLatestSession(snapshot);
    navigate("/session-complete");
  }, [finishSession, navigate, quiz.getSnapshot, quiz.sessionFinished]);

  const handleSubmit = () => {
    if (!activeQuestionLetter) {
      return;
    }

    const answerOutcome = quiz.submitAnswer(progress.currentStreak);
    if (!answerOutcome) {
      return;
    }

    markAnswer(activeQuestionLetter, answerOutcome.correct, answerOutcome.xpAwarded);

    const predictedStats = {
      correct: activeQuestionLetter.stats.correct + (answerOutcome.correct ? 1 : 0),
      wrong: activeQuestionLetter.stats.wrong + (answerOutcome.correct ? 0 : 1),
      streak: answerOutcome.correct ? activeQuestionLetter.stats.streak + 1 : 0,
    };

    setPendingMasteredIds(
      !activeQuestionLetter.mastered && isMastered(predictedStats) ? [activeQuestionLetter.id] : [],
    );
  };

  const handleContinue = () => {
    quiz.nextQuestion(pendingMasteredIds);
    setPendingMasteredIds([]);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route
          path="/learn"
          element={
            <Layout footer>
              <div className="mx-auto max-w-5xl pb-40 pt-6">
                {quiz.question ? (
                  <>
                    <QuizCard
                      question={quiz.question}
                      selectedOptionId={quiz.selectedOptionId}
                      result={quiz.result}
                      progressPercent={quiz.progressPercent}
                      streak={progress.currentStreak}
                      xp={progress.xp}
                      onSelect={quiz.setSelectedOptionId}
                    />
                    {!quiz.result ? (
                      <div className="mt-12 flex justify-center">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={!quiz.selectedOptionId}
                          className="bg-primary-gradient w-full max-w-md rounded-2xl py-5 font-headline text-xl font-bold text-on-primary shadow-xl shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Prüfen
                        </button>
                      </div>
                    ) : null}
                    {quiz.result ? (
                      <FeedbackBanner question={quiz.question} result={quiz.result} onContinue={handleContinue} />
                    ) : null}
                  </>
                ) : null}
              </div>
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout withSideNav footer>
              <Dashboard
                progress={progress}
                letters={letters}
                achievements={achievements}
                onResume={() => navigate("/learn")}
              />
            </Layout>
          }
        />
        <Route
          path="/achievements"
          element={
            <Layout footer>
              <div className="mx-auto max-w-7xl">
                <section className="mb-16">
                  <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight text-on-surface md:text-6xl">
                    Deine <span className="text-primary">Meilensteine</span>
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                    Jeder Fortschritt ist eine Form von Kunst. Deine Leistungen spiegeln dein Engagement für die russische Kultur und Sprache wider.
                  </p>
                </section>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                  <div className="md:col-span-8">
                    <AchievementCard featured achievement={achievements.find((item) => item.unlocked) ?? achievements[0]} />
                  </div>

                  <div className="rounded-3xl bg-surface-container-low p-8 md:col-span-4">
                    <span className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">Gesamtfortschritt</span>
                    <div className="mt-2 font-headline text-5xl font-extrabold text-on-surface">
                      {achievements.filter((item) => item.unlocked).length}/{achievements.length}
                    </div>
                    <div className="mt-8 h-2 w-full rounded-full bg-surface-variant">
                      <div
                        className="h-2 rounded-full bg-secondary"
                        style={{
                          width: `${(achievements.filter((item) => item.unlocked).length / achievements.length) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-on-surface-variant">
                      Du bist unter den aktivsten Besucherinnen und Besuchern der Galerie.
                    </p>
                  </div>

                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="md:col-span-4">
                      <AchievementCard achievement={achievement} />
                    </div>
                  ))}
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/session-complete"
          element={
            <Layout footer>
              {progress.lastSession ? (
                <SessionSummary
                  snapshot={progress.lastSession}
                  letters={letters}
                  onNextRound={() => {
                    setLatestSession(null);
                    quiz.resetSession();
                    navigate("/learn");
                  }}
                  onDashboard={() => navigate("/dashboard")}
                />
              ) : (
                <Navigate to="/learn" replace />
              )}
            </Layout>
          }
        />
      </Routes>

      {popup ? (
        <div className="fixed right-6 top-24 z-[60] max-w-sm rounded-3xl bg-surface-container-lowest p-6 shadow-float">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-gradient text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
              {popup.icon}
            </span>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-primary">Erfolg freigeschaltet</div>
          <h3 className="mt-2 font-headline text-2xl font-bold text-on-surface">{popup.title}</h3>
          <p className="mt-1 text-on-surface-variant">{popup.description}</p>
        </div>
      ) : null}
    </>
  );
}

export default App;
