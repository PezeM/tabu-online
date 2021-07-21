import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { LoginComponent } from "../components/LoginComponents";
import { useHistory, useParams } from "react-router-dom";
import { socket } from "../services/socket";
import {
  CLIENT_EVENT_NAME,
  SERVER_EVENT_NAME,
} from "../../../shared/constants/events";
import { useListenServerEvent } from "../hooks/useListenServerEvent";
import { LobbyCP } from "../../../shared/dto/lobby.dto";

type ParamsType = {
  id: string;
};

export const Invite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const params = useParams<ParamsType>();

  const onSubmit = (username: string) => {
    console.log("Emit join lobby", username);
    setIsLoading(true);
    socket.emit(CLIENT_EVENT_NAME.JoinLobby, username, params.id);
  };

  useListenServerEvent(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby, () => {
    setIsLoading(false);
  });

  useListenServerEvent(SERVER_EVENT_NAME.UserJoinLobby, (lobbyCP: LobbyCP) => {
    setIsLoading(false);
    console.log("Lobby cp:", lobbyCP);
    history.push("/lobby");
  });

  console.log(params);

  return (
    <Box>
      <LoginComponent onSubmit={onSubmit} isLoading={isLoading} />
    </Box>
  );
};
