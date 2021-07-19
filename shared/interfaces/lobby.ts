import { LobbyLanguage } from "../enums/lobby";

export interface LobbySettings {
  maxPlayers: number;
  language: LobbyLanguage;
  roundTime: number;
  maximumNumberOfSkips: number;
  pointsToWin: number;
  cardsIds?: string[];
}
