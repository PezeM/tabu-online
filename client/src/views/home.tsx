import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { LoginComponent } from "../components/LoginComponents";
import { socket } from "../services/socket";
import {
  CLIENT_EVENT_NAME,
  SERVER_EVENT_NAME,
} from "../../../shared/constants/events";
import { useListenServerEvent } from "../hooks/useListenServerEvent";
import { getBrowserLanguage } from "../utils/browser";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (username: string) => {
    console.log("on submit", username);
    setIsLoading(true);
    socket.emit(CLIENT_EVENT_NAME.CreateLobby, username, getBrowserLanguage());
  };

  useListenServerEvent(SERVER_EVENT_NAME.UserLobbyInvalidUsername, () => {
    setIsLoading(false);
  });

  useListenServerEvent(SERVER_EVENT_NAME.UserJoinLobby, () => {
    setIsLoading(false);
  });

  useListenServerEvent(SERVER_EVENT_NAME.UserJoinedLobby, (userId: string) => {
    console.log(`User with id: ${userId} joined lobby`);
    setIsLoading(false);
  });

  useListenServerEvent(SERVER_EVENT_NAME.UserCouldntCreateLobby, () => {
    setIsLoading(false);
  });

  return (
    <Box>
      <LoginComponent onSubmit={onSubmit} isLoading={isLoading} />
    </Box>
  );
};
