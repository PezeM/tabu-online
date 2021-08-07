import { Server, Socket } from 'socket.io';
import { EventsFromClient, EventsFromServer } from '@shared/socket';
import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { Client } from '@models/client.model';
import { LobbySettings } from '@shared/interfaces/lobby';

export interface EventsFromClientOnServer {
  [CLIENT_EVENT_NAME.Test]: (socket: ClientSocket, msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (
    socket: ClientSocket,
    username: string,
    language: string,
  ) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (socket: ClientSocket, username: string, lobbyId: string) => void;
  [CLIENT_EVENT_NAME.Disconnect]: (socket: Socket, reason: string) => void;
  [CLIENT_EVENT_NAME.Disconnecting]: (socket: Socket, reason: string) => void;
  [CLIENT_EVENT_NAME.ChangeTeam]: (socket: Socket) => void;
  [CLIENT_EVENT_NAME.LobbyUpdateSettings]: (
    socket: ClientSocket,
    settings: Partial<LobbySettings>,
  ) => void;
}

export type ServerSocket = Server<EventsFromClient, EventsFromServer>;
export type ClientSocket = TabuUserSocket<EventsFromClient, EventsFromServer>;

export interface TabuUserSocket<ListenEvents, EmitEvents> extends Socket<ListenEvents, EmitEvents> {
  username: string;
  clientUser?: Client;
}
