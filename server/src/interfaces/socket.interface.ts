import { Server, Socket } from 'socket.io';
import { EventsFromClient, EventsFromServer } from '@shared/socket';
import { CLIENT_EVENT_NAME } from '@shared/constants/events';

export interface EventsFromClientOnServer {
  [CLIENT_EVENT_NAME.Test]: (socket: ClientSocket, msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (socket: ClientSocket, username: string, language: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (socket: ClientSocket, username: string, lobbyId: string) => void;
}

export type ServerSocket = Server<EventsFromClient, EventsFromServer>;
export type ClientSocket = TabuUserSocket<EventsFromClient, EventsFromServer>;

export interface TabuUserSocket<ListenEvents, EmitEvents> extends Socket<ListenEvents, EmitEvents> {
  username: string;
}
