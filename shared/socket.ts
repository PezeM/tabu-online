import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "./constants";
import { NotificationVariation } from "./notification";
import { CardSetsCountDto, ClientCP, LobbyCP } from "./dto";
import { Team } from "./enums";
import { LobbySettings } from "./interfaces";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.FromServer]: (co: string[]) => void;
  [SERVER_EVENT_NAME.UserJoinLobby]: (
    lobbyCP: LobbyCP,
    clientCSP: ClientCP,
    cardSets?: CardSetsCountDto[]
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
  [SERVER_EVENT_NAME.LobbyUserChangedTeam]: (
    clientId: string,
    team: Team
  ) => void;
  [SERVER_EVENT_NAME.LobbySettingsChanged]: (
    lobbySettings: LobbySettings
  ) => void;
  [SERVER_EVENT_NAME.LobbySettingsUpdateFailed]: (msg: string) => void;
  [SERVER_EVENT_NAME.UpdateCardSets]: (cardSets: CardSetsCountDto[]) => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Test]: (msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (username: string, language: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (username: string, lobbyId: string) => void;
  [CLIENT_EVENT_NAME.Disconnect]: (reason: string) => void;
  [CLIENT_EVENT_NAME.Disconnecting]: (reason: string) => void;
  [CLIENT_EVENT_NAME.ChangeTeam]: () => void;
  [CLIENT_EVENT_NAME.LobbyUpdateSettings]: (
    settings: Partial<LobbySettings>
  ) => void;
  [CLIENT_EVENT_NAME.TryStartGame]: () => void;
}
