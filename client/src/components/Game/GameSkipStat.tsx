import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCurrentGameTeam, selectGame } from '@/features/game/game.slice';
import { useTranslation } from 'react-i18next';
import { RepeatIcon } from '@chakra-ui/icons';

export const GameSkipStat = () => {
  const gameTeam = useAppSelector(selectCurrentGameTeam);
  const game = useAppSelector(selectGame);
  const { t } = useTranslation();

  return (
    <Box alignSelf={'center'} display="flex" alignItems={'center'}>
      <RepeatIcon mr={[1, 2, 3, 4]} w={8} h={8} color={'green.500'} />
      <Heading size="md">
        {t('ui.skips')} {gameTeam?.numberOfSkips ?? 0} / {game?.maximumNumberOfSkips ?? 0}
      </Heading>
    </Box>
  );
};
