import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "./constants/events";
import { NotificationVariation } from "./notification";
import { ClientCP } from "./dto/client.dto";
import { LobbyCP } from "./dto/lobby.dto";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.FromServer]: (co: string[]) => void;
  [SERVER_EVENT_NAME.UserJoinLobby]: (lobbyCP: LobbyCP, clientCP: ClientCP) => void;
  [SERVER_EVENT_NAME.UserJoinedLobby]: (clientCP: ClientCP) => void;
  [SERVER_EVENT_NAME.Notification]: (
    message: string,
    variant: NotificationVariation
  ) => void;
  [SERVER_EVENT_NAME.UserLeftRoom]: () => void;
  [SERVER_EVENT_NAME.LobbyUserLeft]: (
    clientId: string,
    ownerId: string
  ) => void;
  [SERVER_EVENT_NAME.CouldntCreateOrJoinLobby]: () => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Test]: (msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (username: string, language: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (username: string, lobbyId: string) => void;
  [CLIENT_EVENT_NAME.Disconnect]: (reason: string) => void;
}
