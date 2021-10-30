import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCurrentCard } from '@/features/game/game.slice';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { EmptyCard } from '@/components/Game/Card/EmptyCard';
import { GameCards } from '@/components/Game/Card/GameCards';

const MotionBox = motion<BoxProps>(Box);

export const GameCardContainer = () => {
  const card = useAppSelector(selectCurrentCard);

  return (
    <MotionBox display="flex" justifyContent="center" alignItems="center">
      <AnimatePresence initial={false}>
        <Box height={'300px'} width={'250px'} position={'relative'}>
          {card ? <GameCards card={card} /> : <EmptyCard />}
        </Box>
      </AnimatePresence>
    </MotionBox>
  );
};