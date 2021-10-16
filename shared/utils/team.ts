import { Team } from "../enums";

export const getOppositeTeam = (team: Team) =>
  team === Team.Red ? Team.Blue : Team.Red;
