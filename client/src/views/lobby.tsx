import React from "react";
import { Box, Code, Text } from "@chakra-ui/react";
import { useListenServerEvent } from "../hooks/useListenServerEvent";
import { SERVER_EVENT_NAME } from "../../../shared/constants/events";
import { ClientCP } from "../../../shared/dto/client.dto";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectIsInLobby, selectLobby } from "../features/lobby/lobby.slice";
import { LobbySkeleton } from "../components/Skeletons/LobbySkeleton";

export const Lobby = () => {
  const isInLobby = useAppSelector(selectIsInLobby);
  const lobbyData = useAppSelector(selectLobby);

  useListenServerEvent(
    SERVER_EVENT_NAME.UserJoinedLobby,
    (userCP: ClientCP) => {
      console.log(`User with id: ${userCP.id} joined lobby`, userCP);
    }
  );

  if (!isInLobby) {
    return <LobbySkeleton delay={1000} page={"/"} />;
  }

  return (
    <Box>
      <Text>Is in lobby {isInLobby ? "True" : "False"}</Text>
      <Code>{JSON.stringify(lobbyData, null, 4)}</Code>
    </Box>
  );
};
