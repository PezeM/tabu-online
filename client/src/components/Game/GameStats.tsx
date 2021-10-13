import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCurrentGameTeam, selectGame } from '@/features/game/game.slice';
import { GamePointStat } from '@/components/Game/GamePointStat';
import { GameSkipStat } from '@/components/Game/GameSkipStat';

export const GameStats = () => {
  const game = useAppSelector(selectGame);

  return (
    <Grid
      marginTop={['2vh', '3vh', '5vh']}
      templateColumns={'repeat(3, 1fr)'}
      justifyItems={'center'}
    >
      <GamePointStat />
      <Box>Time {game?.roundTime}</Box>
      <GameSkipStat />
    </Grid>
  );
};
