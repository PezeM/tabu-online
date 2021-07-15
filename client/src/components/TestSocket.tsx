import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { CLIENT_EVENT_NAME } from "../../../shared/constants/events";
import { socket } from "../services/socket";

export const TestSocket = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const chuj = () => {
    socket.emit(CLIENT_EVENT_NAME.Test, "Co tam powiesz ciekawego");
  };

  return (
    <div>
      <Button onClick={() => chuj()}>Kliknij</Button>
    </div>
  );
};
