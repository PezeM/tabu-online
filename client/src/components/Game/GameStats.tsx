import React, { useEffect, useState } from 'react';
import { Grid, useColorModeValue } from '@chakra-ui/react';
import { GamePointStat } from '@/components/Game/GamePointStat';
import { GameSkipStat } from '@/components/Game/GameSkipStat';
import { GameRoundTimer } from '@/components/Game/GameRoundTimer';
import { GameState } from '@/types/game-state.enum';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGame, selectGameState } from '@/features/game/game.slice';

export const GameStats = () => {
  const [expireTime, setExpireTime] = useState<Date>();

  const game = useAppSelector(selectGame);
  const gameState = useAppSelector(selectGameState);

  const bgColor = useColorModeValue('gray.700', 'blackAlpha.600');

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
      <GamePointStat />
      {/*<GameRoundTimer expireTime={expireTime} />*/}
      <GameSkipStat />
    </Grid>
  );
};
