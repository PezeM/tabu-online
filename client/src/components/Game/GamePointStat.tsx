import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCurrentGameTeam, selectGame } from '@/features/game/game.slice';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '@chakra-ui/icons';

export const GamePointStat = () => {
  const gameTeam = useAppSelector(selectCurrentGameTeam);
  const game = useAppSelector(selectGame);
  const { t } = useTranslation();

  return (
    <Box alignSelf={'center'} display="flex" alignItems={'center'}>
      <StarIcon mr={[1, 2, 3, 4]} w={8} h={8} color={'yellow.400'} />
      <Heading size="md">
        {t('ui.points')} {gameTeam?.points ?? 0} / {game?.pointsToWin ?? 0}
      </Heading>
    </Box>
  );
};