import { LobbyLanguage } from "../enums";

export const LOBBY_LANGUAGES: LobbyLanguage[] = [
  LobbyLanguage.EN,
  LobbyLanguage.PL,
];

export const MAX_POINTS_TO_WIN = 99;
export const MAX_SKIPS_NUMBER = 99;
export const MIN_ROUND_TIME = 10 * 1000; // 10 seconds
export const MAX_ROUND_TIME = 3 * 60 * 1000; // 3 min
