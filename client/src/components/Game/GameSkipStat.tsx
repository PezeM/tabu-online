import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGame, selectGameTeams } from '@/features/game/game.slice';
import { useTranslation } from 'react-i18next';
import { RepeatIcon } from '@chakra-ui/icons';
import { Team } from '../../../../shared/enums';

export const GameSkipStat = () => {
  const gameTeams = useAppSelector(selectGameTeams);
  const game = useAppSelector(selectGame);
  const { t } = useTranslation();

  if (!gameTeams) {
    return null;
  }

  return (
    <Box alignSelf={'center'} display="flex" alignItems={'center'}>
      <RepeatIcon mr={[1, 2, 3, 4]} w={8} h={8} color={'green.500'} />
      <Heading size="md">
        {t('ui.skips')} {gameTeams[Team.Blue]?.numberOfSkips ?? 0} / {game?.maximumNumberOfSkips ?? 0}
      </Heading>
    </Box>
  );
};
