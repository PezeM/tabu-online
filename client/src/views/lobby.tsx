import React from 'react';
import { Grid, useToast } from '@chakra-ui/react';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { ClientCP, GameCP, GameTeamCP, PlayerCP } from '../../../shared/dto';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  addMember,
  changeLobbySettings,
  changeMemberTeam,
  removeMember, resetLobbyState,
  selectIsInLobby
} from '@/features/lobby/lobby.slice';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import { Team } from '../../../shared/enums';
import { changeClientTeam, resetClientState, selectClient } from '@/features/client/client.splice';
import { LobbySettingsTabs } from '@/components/LobbySettings/LobbySettingsTabs';
import { LobbySettings } from '../../../shared/interfaces';
import { TeamsContainer } from '@/components/Team/TeamsContainer';
import { LobbyFooter } from '@/components/LobbyFooter';
import { setIsLoading } from '@/features/settings/settings.splice';
import { useHistory } from 'react-router-dom';
import { setGame, setGameTeams } from '@/features/game/game.slice';
import { setPlayer } from '@/features/player/player.slice';
import { showErrorNotification } from '@/utils/notification';

export const Lobby = () => {
  const isInLobby = useAppSelector(selectIsInLobby);
  const clientData = useAppSelector(selectClient);
  const history = useHistory();
  const toast = useToast();

  const dispatch = useAppDispatch();

  useListenServerEvent(SERVER_EVENT_NAME.UserJoinedLobby, (clientCP: ClientCP) => {
    dispatch(addMember(clientCP));
  });

  useListenServerEvent(SERVER_EVENT_NAME.LobbyUserLeft, (clientId: string, newOwnerId: string) => {
    dispatch(removeMember({ clientId, newOwnerId }));
  });

  useListenServerEvent(SERVER_EVENT_NAME.UserLeftRoom, () => {
    dispatch(resetLobbyState());
    dispatch(resetClientState());
    dispatch(setIsLoading(false));

    history.push('/');
  });

  useListenServerEvent(
    SERVER_EVENT_NAME.LobbyUserChangedTeam,
    (clientId: string, newTeam: Team) => {
      dispatch(changeMemberTeam({ clientId, newTeam }));

      if (clientData?.id === clientId) {
        dispatch(changeClientTeam(newTeam));
      }
    },
  );

  useListenServerEvent(SERVER_EVENT_NAME.LobbySettingsChanged, (newSettings: LobbySettings) => {
    dispatch(changeLobbySettings(newSettings));
    dispatch(setIsLoading(false));
  });

  useListenServerEvent(
    SERVER_EVENT_NAME.GameStarted,
    (gameCP: GameCP, playerCP: PlayerCP, teamMap: Record<Team, GameTeamCP>) => {
      dispatch(setGame(gameCP));
      dispatch(setPlayer(playerCP));
      dispatch(setGameTeams(teamMap));
      dispatch(setIsLoading(false));

      history.push('/game');
    },
  );

  useListenServerEvent(SERVER_EVENT_NAME.LobbyKickedClient, () => {
    dispatch(setIsLoading(false));
  });

  useListenServerEvent(SERVER_EVENT_NAME.LobbyFailedToKickClient, (msg: string) => {
    showErrorNotification(toast, msg);
    dispatch(setIsLoading(false));
  });

  if (!isInLobby) {
    return <LobbySkeleton delay={1000} page={'/'} />;
  }

  return (
    <Grid
      gap={[2, 4, 6]}
      h={'100%'}
      overflowY={'auto'}
      p={4}
    >
      <TeamsContainer />
      <LobbySettingsTabs />
      <LobbyFooter />
    </Grid>
  );
};
