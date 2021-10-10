import { LobbyLanguage } from "../enums";

export interface LobbySettings {
  /**
   * Maximum number of players in lobby
   */
  maxPlayers: number;

  /**
   * Language of the cards
   */
  language: LobbyLanguage;

  /**
   * Time of each round in ms
   */
  roundTime: number;

  /**
   * Maximum number of card skips per team
   */
  maximumNumberOfSkips: number;

  /**
   * Number of points required to win
   */
  pointsToWin: number;

  /**
   * IDs of selected cards
   */
  cardIds?: string[];
}

export type LobbyKeys = keyof LobbySettings;
