import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "./constants/events";
import { NotificationVariation } from "./notification";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.FromServer]: (co: string[]) => void;
  [SERVER_EVENT_NAME.UserLobbyInvalidUsername]: (msg: string) => void;
  [SERVER_EVENT_NAME.UserAlreadyInLobby]: () => void;
  [SERVER_EVENT_NAME.UserJoinLobby]: () => void;
  [SERVER_EVENT_NAME.UserJoinedLobby]: (userId: string) => void;
  [SERVER_EVENT_NAME.Notification]: (message: string, variant: NotificationVariation) => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Test]: (msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (username: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (username: string, lobbyId: string) => void;
}
