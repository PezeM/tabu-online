import React from 'react';
import { Box, Button, Code, Text } from '@chakra-ui/react';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '../../../shared/constants/events';
import { ClientCP } from '../../../shared/dto/client.dto';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  addMember,
  changeMemberTeam,
  removeMember,
  selectIsInLobby,
  selectLobby,
} from '@/features/lobby/lobby.slice';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import { Team } from '../../../shared/enums/client';
import { changeClientTeam, selectClient } from '@/features/client/client.splice';
import { socket } from '@/services/socket';
import { LobbySettingTabs } from '@/components/LobbySettings/LobbySettingTabs';

export const Lobby = () => {
  const isInLobby = useAppSelector(selectIsInLobby);
  const lobbyData = useAppSelector(selectLobby);
  const clientData = useAppSelector(selectClient);

  const dispatch = useAppDispatch();

  useListenServerEvent(SERVER_EVENT_NAME.UserJoinedLobby, (clientCP: ClientCP) => {
    console.log(`User with id: ${clientCP.id} joined lobby`, clientCP);
    dispatch(addMember(clientCP));
  });

  useListenServerEvent(SERVER_EVENT_NAME.LobbyUserLeft, (clientId: string, newOwnerId: string) => {
    console.log(`User with id: ${clientId} left lobby`, newOwnerId);
    dispatch(removeMember({ clientId, newOwnerId }));
  });

  useListenServerEvent(
    SERVER_EVENT_NAME.LobbyUserChangedTeam,
    (clientId: string, newTeam: Team) => {
      console.log('User changed team', clientId, newTeam);

      dispatch(changeMemberTeam({ clientId, newTeam }));

      if (clientData?.id === clientId) {
        dispatch(changeClientTeam(newTeam));
      }
    },
  );

  const changeTeam = () => {
    socket.emit(CLIENT_EVENT_NAME.ChangeTeam);
  };

  const updateSettings = () => {
    socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, { maxPlayers: 18 });
  };

  if (!isInLobby) {
    return <LobbySkeleton delay={1000} page={'/'} />;
  }

  return (
    <Box>
      <Text>Is in lobby {isInLobby ? 'True' : 'False'}</Text>
      <Code>{JSON.stringify(lobbyData, null, 4)}</Code>
      <Button onClick={() => changeTeam()}>Change team</Button>
      <Button onClick={() => updateSettings()}>Update settings</Button>
      <LobbySettingTabs />
    </Box>
  );
};
