import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "./constants/events";
import { NotificationVariation } from "./notification";
import { ClientCP } from "./dto/client.dto";
import { LobbyCP } from "./dto/lobby.dto";
import { Team } from "./enums/client";
import { LobbySettings } from "./interfaces/lobby";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.FromServer]: (co: string[]) => void;
  [SERVER_EVENT_NAME.UserJoinLobby]: (
    lobbyCP: LobbyCP,
    clientCSP: ClientCP
  ) => void;
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
  [SERVER_EVENT_NAME.LobbyUserChangedTeam]: (clientId: string, team: Team) => void;
  [SERVER_EVENT_NAME.LobbySettingsChanged]: (lobbySettings: LobbySettings) => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Test]: (msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (username: string, language: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (username: string, lobbyId: string) => void;
  [CLIENT_EVENT_NAME.Disconnect]: (reason: string) => void;
  [CLIENT_EVENT_NAME.Disconnecting]: (reason: string) => void;
  [CLIENT_EVENT_NAME.ChangeTeam]: () => void;
  [CLIENT_EVENT_NAME.LobbyUpdateSettings]: (settings: Partial<LobbySettings>) => void;
}
