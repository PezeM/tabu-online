import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "./constants/events";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.FromServer]: (co: string[]) => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Test]: (msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (msg2: string, secondArg: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (msg3: string) => void;
}
