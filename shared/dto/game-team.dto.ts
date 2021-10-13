import { Team } from '../enums';

export interface GameTeamCP {
  team: Team;
  numberOfSkips: number;
  points: number;
}