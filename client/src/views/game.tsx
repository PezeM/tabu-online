import React from 'react';
import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import {
  resetGameState,
  selectIsInGame,
  setGameState,
  setGameTeams,
  setPlayerStats
} from '@/features/game/game.slice';
import { GameStats } from '@/components/Game/GameStats';
import { GameButtons } from '@/components/Game/GameButtons';
import { GameCardContainer } from '@/components/Game/GameCardContainer';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { GameState } from '@/types/game-state.enum';
import { Team } from '../../../shared/enums';
import { GameTeamCP, PlayerStatsCP } from '../../../shared/dto';
import { GameEndModal } from '@/components/Game/GameEndModal';
import { resetPlayerState } from '@/features/player/player.slice';
import { useHistory } from 'react-router-dom';

export const Game = () => {
  const isInGame = useAppSelector(selectIsInGame);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useListenServerEvent(
    SERVER_EVENT_NAME.GameHasEnded,
    (teamMap: Record<Team, GameTeamCP>, playerStats: PlayerStatsCP) => {
      dispatch(setPlayerStats(playerStats));
      dispatch(setGameTeams(teamMap));
      dispatch(setGameState(GameState.GameEnded));
      onOpen();
    },
  );

  const closeEndGameModal = () => {
    // Go back to lobby
    dispatch(resetGameState());
    dispatch(resetPlayerState());

    onClose();

    history.push('/lobby');
  }

  if (!isInGame) {
    return <LobbySkeleton delay={1000} page={'/'} />;
  }

  return (
    <Grid gap={[2, 4, 6]} templateRows={'1fr 3fr auto'} h={'100%'} overflowY={'auto'}>
      <GameStats />
      <GameCardContainer />
      <GameButtons />
      <GameEndModal isOpen={isOpen} onClose={closeEndGameModal} />
    </Grid>
  );
};
