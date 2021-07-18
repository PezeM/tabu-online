import { ClientCP } from "./client.dto";

export interface LobbyCP {
  id: string;
  ownerId: string;
  members: ClientCP[];
}
