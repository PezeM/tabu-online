import React from 'react';
import { Grid } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { LobbySkeleton } from '@/components/Skeletons/LobbySkeleton';
import { selectIsInGame } from '@/features/game/game.slice';
import { GameStats } from '@/components/Game/GameStats';
import { GameButtons } from '@/components/Game/GameButtons';
import { GameCardContainer } from '@/components/Game/GameCardContainer';

export const Game = () => {
  const isInGame = useAppSelector(selectIsInGame);

  if (!isInGame) {
    return <LobbySkeleton delay={1000} page={'/'} />;
  }

  return (
    <Grid gap={[2, 4, 6]} templateRows={'1fr 3fr auto'} h={'100%'} overflowY={'auto'}>
      <GameStats />
      <GameCardContainer />
      <GameButtons />
    </Grid>
  );
};
