import { Team } from "../enums";

export interface PlayerCP {
  id: string;
  username: string;
  team: Team;
}

export interface PlayerStatsCP {
  username: string;
  team: Team;
  numberOfSkips: number;
  timesShowingCard: number;
}
