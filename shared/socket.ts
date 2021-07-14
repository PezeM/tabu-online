import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "./constants/events";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.FromServer]: () => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Test]: (msg: string) => void;
}
