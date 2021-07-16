import { Server, Socket } from 'socket.io';
import { EventsFromClient, EventsFromServer } from '../../../shared/socket';
import { CLIENT_EVENT_NAME } from '../../../shared/constants/events';

export interface EventsFromClientOnServer {
  [CLIENT_EVENT_NAME.Test]: (socket: Socket, msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (socket: Socket, msg2: string, secondArg: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (socket: Socket, msg3: string) => void;
}

export type ServerSocket = Server<EventsFromClient, EventsFromServer>;
