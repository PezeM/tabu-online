import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGame, selectGameTeams } from '@/features/game/game.slice';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '@chakra-ui/icons';
import { Team } from '../../../../shared/enums';

export const GamePointStat = () => {
  const gameTeams = useAppSelector(selectGameTeams);
  const game = useAppSelector(selectGame);
  const { t } = useTranslation();

  if (!gameTeams) {
    return null;
  }

  return (
    <Box alignSelf={'center'} display="flex" alignItems={'center'}>
      <StarIcon mr={[1, 2, 3, 4]} w={8} h={8} color={'yellow.400'} />
      <Heading size="md">
        {t('ui.points')} {gameTeams[Team.Red]?.points ?? 0} / {game?.pointsToWin ?? 0}
      </Heading>
    </Box>
  );
};
