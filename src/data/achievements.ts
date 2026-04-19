import { Achievement } from "../types";

export const achievementDefinitions: Achievement[] = [
  {
    id: "first-correct",
    title: "Erster Treffer",
    description: "Deine erste richtige Antwort in der Galerie.",
    icon: "check_circle",
    unlocked: false,
  },
  {
    id: "five-streak",
    title: "5 in Folge",
    description: "Fünf richtige Antworten hintereinander.",
    icon: "electric_bolt",
    unlocked: false,
  },
  {
    id: "ten-learned",
    title: "10 Buchstaben gelernt",
    description: "Zehn Zeichen wurden sicher verankert.",
    icon: "menu_book",
    unlocked: false,
  },
  {
    id: "hundred-xp",
    title: "100 XP verdient",
    description: "Du hast die erste XP-Schwelle erreicht.",
    icon: "workspace_premium",
    unlocked: false,
  },
  {
    id: "perfect-round",
    title: "Perfekte Runde",
    description: "Eine Session ohne Fehler abgeschlossen.",
    icon: "auto_awesome",
    unlocked: false,
  },
  {
    id: "seven-day-streak",
    title: "7-Tage-Serie",
    description: "Sieben Tage hintereinander gelernt.",
    icon: "calendar_today",
    unlocked: false,
  },
];
