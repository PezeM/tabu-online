import { Team } from "../enums";

export const getOppositeTeam = (team) =>
  team === Team.Red ? Team.Blue : Team.Red;
