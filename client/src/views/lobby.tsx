import React from "react";
import { Box, Code, Text } from "@chakra-ui/react";
import { useListenServerEvent } from "../hooks/useListenServerEvent";
import { SERVER_EVENT_NAME } from "../../../shared/constants/events";
import { ClientCP } from "../../../shared/dto/client.dto";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  addMember,
  removeMember,
  selectIsInLobby,
  selectLobby,
} from "../features/lobby/lobby.slice";
import { LobbySkeleton } from "../components/Skeletons/LobbySkeleton";

export const Lobby = () => {
  const isInLobby = useAppSelector(selectIsInLobby);
  const lobbyData = useAppSelector(selectLobby);
  const dispatch = useAppDispatch();

  useListenServerEvent(
    SERVER_EVENT_NAME.UserJoinedLobby,
    (clientCP: ClientCP) => {
      console.log(`User with id: ${clientCP.id} joined lobby`, clientCP);
      dispatch(addMember(clientCP));
    }
  );

  useListenServerEvent(
    SERVER_EVENT_NAME.LobbyUserLeft,
    (clientId: string, newOwnerId: string) => {
      console.log(`User with id: ${clientId} left lobby`, newOwnerId);
      dispatch(removeMember({ clientId, newOwnerId }));
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
