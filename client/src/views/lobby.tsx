import React from "react";
import { Box } from "@chakra-ui/react";
import { useListenServerEvent } from "../hooks/useListenServerEvent";
import { SERVER_EVENT_NAME } from "../../../shared/constants/events";
import { ClientCP } from "../../../shared/dto/client.dto";

export const Lobby = () => {
  useListenServerEvent(
    SERVER_EVENT_NAME.UserJoinedLobby,
    (userCP: ClientCP) => {
      console.log(`User with id: ${userCP.id} joined lobby`, userCP);
    }
  );

  return <Box>In lobby</Box>;
};
