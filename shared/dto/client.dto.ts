import { Team } from "../enums/client";

export interface ClientCP {
  id: string;
  username: string;
  team: Team;
}