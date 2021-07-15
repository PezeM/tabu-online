import { io, Socket } from "socket.io-client";
import { EventsFromClient, EventsFromServer } from "../../../shared/socket";

export const socket: Socket<EventsFromServer, EventsFromClient> = io(
  "http://localhost:3010/",
  {
    autoConnect: false,
  }
);

if (process.env.NODE_ENV === "development") {
  socket.onAny((eventName, ...args) => {
    console.log(`Event: ${eventName} Args:`, args);
  });
}
