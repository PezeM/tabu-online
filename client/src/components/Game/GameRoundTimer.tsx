import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGameState } from '@/features/game/game.slice';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { useTimer } from 'react-timer-hook';
import { GameState } from '@/types/game-state.enum';
import { ClockIcon } from '@/styles/icons';

interface Props {
  expireTime?: Date;
}

export const GameRoundTimer = React.memo(({ expireTime }: Props) => {
  const gameState = useAppSelector(selectGameState);

  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp: expireTime ?? new Date(),
    autoStart: false,
  });

  useEffect(() => {
    if (gameState !== GameState.WaitingForNextRound && expireTime) {
      restart(expireTime);
      start();
    }
  }, [start, restart, gameState, expireTime]);

  return (
    <Box display="flex" alignSelf={'center'} alignItems={'center'}>
      <ClockIcon mr={[1, 2, 3, 4]} w={8} h={8} color={useColorModeValue('gray.800', 'gray.300')} />
      <Heading size="lg">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Heading>
    </Box>
  );
});
