import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import { selectIsInGame } from '@/features/game/game.slice';
import { GameLogo } from '@/components/GameLogo';
import { GameStats } from '@/components/Game/GameStats';
import { GameButtons } from '@/components/Game/GameButtons';

export const Game = () => {
  const isInGame = useAppSelector(selectIsInGame);

  if (!isInGame) {
    return <LobbySkeleton delay={1000} page={'/'} />;
  }

  return (
    <Grid
      gap={[2, 4, 6]}
      templateRows={'1fr 2fr auto'}
      h={'100%'}
      overflowY={'auto'}
    >
      <GameLogo />
      <GameStats />
      {/* Add some stats on top like time, skips and points */}
      {/* Center card */}
      {/* Add button to skip card by enemy team and current explainer */}
      <Box>Inside game</Box>
      <GameButtons />
    </Grid>
  );
};
