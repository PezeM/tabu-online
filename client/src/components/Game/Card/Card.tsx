import { motion, MotionProps, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { GameCard } from './GameCard';
import { CardDto } from '../../../../../shared/dto';

export const MotionBox = motion<BoxProps>(Box);

interface Props extends MotionProps {
  card: CardDto;
  exitX?: string;
  setExitX?: Dispatch<SetStateAction<string>>;
  transition: any;
  index?: number;
  setIndex?: Dispatch<SetStateAction<number>>;
}

export const Card = ({
  card,
  drag,
  initial,
  animate,
  transition,
  exitX,
  setExitX,
  index,
  setIndex,
}: Props) => {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-350, 0, 350], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-350, 0, 350], [-45, 0, 45], {
    clamp: false,
  });

  function handleDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x < -200) {
      // Left, skip card
      setExitX?.('-350');
      setIndex?.((index ?? 0) + 1);
    }

    if (info.offset.x > 200) {
      // Right, next card
      setExitX?.('350');
      setIndex?.((index ?? 0) + 1);
    }
  }

  return (
    <MotionBox
      style={{
        width: 250,
        height: 350,
        position: 'absolute',
        top: 0,
        x: x,
        rotate: rotate as any,
        cursor: 'grab',
      }}
      whileTap={{ cursor: 'grabbing' }}
      drag={drag}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnd={handleDragEnd as any}
      initial={initial}
      animate={animate}
      transition={transition}
      exit={{
        x: exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <MotionBox
        style={{
          width: 250,
          minHeight: 300,
          borderRadius: 30,
          scale: scale as any,
        }}
      >
        <GameCard card={card} />
      </MotionBox>
    </MotionBox>
  );
};