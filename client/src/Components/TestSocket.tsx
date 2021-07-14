import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";
import { EventsFromClient, EventsFromServer } from "../../../shared/socket";
import {
  CLIENT_EVENT_NAME,
  SERVER_EVENT_NAME,
} from "../../../shared/constants/events";

export const TestSocket = () => {
  const [socket, setSocket] = useState<
    Socket<EventsFromServer, EventsFromClient> | undefined
  >(undefined);

  useEffect(() => {
    const newSocket: Socket<EventsFromServer, EventsFromClient> = io(
      "http://localhost:3010/",
      {
        autoConnect: false,
      }
    );

    function onTestEvent() {
      console.log("On test event from server");
    }

    newSocket.connect();
    setSocket(newSocket);

    socket?.on(SERVER_EVENT_NAME.FromServer, onTestEvent);

    return () => {
      newSocket.off(SERVER_EVENT_NAME.FromServer, onTestEvent);
      newSocket.disconnect();
    };
  }, []);

  const chuj = () => {
    socket?.emit(CLIENT_EVENT_NAME.Test, "Co tam powiesz ciekawego");
  };

  return (
    <div>
      <Button onClick={() => chuj()}>Kliknij</Button>
    </div>
  );
};
