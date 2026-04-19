import { Achievement } from "../types";

export const achievementDefinitions: Achievement[] = [
  {
    id: "first-correct",
    title: "Erste richtige Antwort",
    description: "Du hast zum ersten Mal richtig geantwortet.",
    icon: "check_circle",
    unlocked: false,
  },
  {
    id: "five-streak",
    title: "Fünf in Folge",
    description: "Fünf richtige Antworten hintereinander.",
    icon: "electric_bolt",
    unlocked: false,
  },
  {
    id: "ten-learned",
    title: "Zehn Buchstaben gelernt",
    description: "Du hast bereits zehn Buchstaben geübt.",
    icon: "menu_book",
    unlocked: false,
  },
  {
    id: "hundred-xp",
    title: "100 XP erreicht",
    description: "Du hast die ersten 100 XP gesammelt.",
    icon: "workspace_premium",
    unlocked: false,
  },
  {
    id: "perfect-round",
    title: "Fehlerfreie Runde",
    description: "Du hast eine Runde ohne Fehler abgeschlossen.",
    icon: "auto_awesome",
    unlocked: false,
  },
  {
    id: "seven-day-streak",
    title: "Sieben Tage am Stück",
    description: "Du hast an sieben Tagen hintereinander gelernt.",
    icon: "calendar_today",
    unlocked: false,
  },
];
