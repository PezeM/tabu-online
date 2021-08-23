import React from 'react';
import { Flex, Grid } from '@chakra-ui/react';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '../../../shared/constants/events';
import { ClientCP } from '../../../shared/dto/client.dto';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  addMember,
  changeLobbySettings,
  changeMemberTeam,
  removeMember,
  selectIsInLobby,
  selectLobby,
} from '@/features/lobby/lobby.slice';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import { Team } from '../../../shared/enums/client';
import { changeClientTeam, selectClient } from '@/features/client/client.splice';
import { socket } from '@/services/socket';
import { LobbySettingsTabs } from '@/components/LobbySettings/LobbySettingsTabs';
import { LobbySettings } from '../../../shared/interfaces/lobby';
import { TeamsContainer } from '@/components/Team/TeamsContainer';
import { LobbyFooter } from '@/components/LobbyFooter';

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

  useListenServerEvent(SERVER_EVENT_NAME.LobbySettingsChanged, (newSettings: LobbySettings) => {
    dispatch(changeLobbySettings(newSettings));
  });

  const updateSettings = () => {
    socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, { maxPlayers: 6 });
  };

  if (!isInLobby) {
    return <LobbySkeleton delay={1000} page={'/'} />;
  }

  return (
    <Grid
      gap={[2, 4, 6]}
      templateColumns={'repeat(1, 1fr)'}
      templateRows={'auto 1fr auto'}
      h={'100%'}
      overflowY={'auto'}
    >
      <TeamsContainer />
      <LobbySettingsTabs />
      <LobbyFooter />
    </Grid>
  );
};
