import { ClientCP } from "./client.dto";
import { LobbySettings } from "../interfaces/lobby";

export interface LobbyCP {
  id: string;
  ownerId: string;
  members: ClientCP[];
  settings: LobbySettings;
}
