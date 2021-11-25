import { io, Socket } from 'socket.io-client';
import { EventsFromClient, EventsFromServer } from '../../../shared/socket';

export const socket: Socket<EventsFromServer, EventsFromClient> = io(process.env.REACT_APP_SERVER_URL as string, {
  autoConnect: false
});

if (process.env.NODE_ENV !== 'production') {
  socket.onAny((eventName, ...args) => {
    console.log(`Event: ${eventName} Args:`, args);
  });
}
