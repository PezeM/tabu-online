import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import io from "socket.io-client";

export const TestSocket = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(
    undefined
  );

  useEffect(() => {
    const ioSocket = io("127.0.0.1:8080", {
      autoConnect: false,
    });
    ioSocket.connect();
    setSocket(ioSocket);

    ioSocket.on("test", () => {
      console.log("On test event from server");
    });

    return () => {
      ioSocket.disconnect();
    };
  }, []);

  const chuj = () => {
    const response = socket?.emit("createLobby");
    console.log("Response", response);
  };

  return (
    <div>
      <Button onClick={() => chuj()}>Kliknij</Button>
    </div>
  );
};
