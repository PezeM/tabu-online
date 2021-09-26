import React from 'react';
import { Grid } from '@chakra-ui/react';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { ClientCP } from '../../../shared/dto';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  addMember,
  changeLobbySettings,
  changeMemberTeam,
  removeMember,
  selectIsInLobby
} from '@/features/lobby/lobby.slice';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import { Team } from '../../../shared/enums';
import { changeClientTeam, selectClient } from '@/features/client/client.splice';
import { LobbySettingsTabs } from '@/components/LobbySettings/LobbySettingsTabs';
import { LobbySettings } from '../../../shared/interfaces';
import { TeamsContainer } from '@/components/Team/TeamsContainer';
import { LobbyFooter } from '@/components/LobbyFooter';
import { setIsLoading } from '@/features/settings/settings.splice';

export const Lobby = () => {
  const isInLobby = useAppSelector(selectIsInLobby);
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
    }
  );

  useListenServerEvent(SERVER_EVENT_NAME.LobbySettingsChanged, (newSettings: LobbySettings) => {
    dispatch(changeLobbySettings(newSettings));
    dispatch(setIsLoading(false));
  });

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