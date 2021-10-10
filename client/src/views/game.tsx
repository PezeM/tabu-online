import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import { selectIsInGame } from '@/features/game/game.slice';

export const Game = () => {
  const isInGame = useAppSelector(selectIsInGame);

  const dispatch = useAppDispatch();

  if (!isInGame) {
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
      {/* Add header with logo probably */}
      {/* Add some stats on top like time, skips and points */}
      {/* Center card */}
      {/* Add button to skip card by enemy team and current explainer */}
      <Box>Inside game</Box>
    </Grid>
  );
};
