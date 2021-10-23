import React, { useEffect, useState } from 'react';
import { Grid, useColorModeValue } from '@chakra-ui/react';
import { GameRoundTimer } from '@/components/Game/GameRoundTimer';
import { GameState } from '@/types/game-state.enum';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGame, selectGameState } from '@/features/game/game.slice';
import { GameTeamStats } from '@/components/Game/GameTeamStats';
import { Team } from '@/../../shared/enums/client';

export const GameStats = () => {
  const [expireTime, setExpireTime] = useState<Date>();

  const game = useAppSelector(selectGame);
  const gameState = useAppSelector(selectGameState);

  const bgColor = useColorModeValue('gray.700', 'blackAlpha.500');

  useEffect(() => {
    if (gameState !== GameState.WaitingForNextRound) {
      const now = new Date();
      now.setMilliseconds(now.getMilliseconds() + (game?.roundTime ?? 0));
      setExpireTime(now);
    }
  }, [game, gameState]);

  return (
    <Grid
      templateColumns={'repeat(3, 1fr)'}
      justifyItems={'center'}
      roundedBottom={'xl'}
      bg={bgColor}
    >
      <GameTeamStats team={Team.Red} justifyContent={'flex-start'} />
      <GameRoundTimer expireTime={expireTime} />
      <GameTeamStats team={Team.Blue} justifyContent={'flex-end'} />
    </Grid>
  );
};
