import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { LoginComponent } from "../components/LoginComponents";
import { socket } from "../services/socket";
import {
  CLIENT_EVENT_NAME,
  SERVER_EVENT_NAME,
} from "../../../shared/constants/events";
import { useListenServerEvent } from "../hooks/useListenServerEvent";
import { getBrowserLanguage } from "../utils/browser";
import { ClientCP } from "../../../shared/dto/client.dto";
import { LobbyCP } from "../../../shared/dto/lobby.dto";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = (username: string) => {
    console.log("on submit", username);
    setIsLoading(true);
    socket.emit(CLIENT_EVENT_NAME.CreateLobby, username, getBrowserLanguage());
  };

  useListenServerEvent(SERVER_EVENT_NAME.UserJoinLobby, (lobbyCP: LobbyCP) => {
    setIsLoading(false);
    console.log("Lobby cp:", lobbyCP);
    history.push("/lobby");
  });

  useListenServerEvent(
    SERVER_EVENT_NAME.UserJoinedLobby,
    (userCP: ClientCP) => {
      console.log(`User with id: ${userCP.id} joined lobby`);
      setIsLoading(false);
    }
  );

  useListenServerEvent(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby, () => {
    setIsLoading(false);
  });

  return (
    <Box>
      <Text fontSize={["xl", "3xl", "4xl"]}>
        {t("ui.joinLobby")}
      </Text>
      <LoginComponent onSubmit={onSubmit} isLoading={isLoading} />
    </Box>
  );
};
