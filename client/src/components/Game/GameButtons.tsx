import React from 'react';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGameState } from '@/features/game/game.slice';
import { GameState } from '@/types/game-state.enum';
import { RedoIcon } from '@/styles/icons';

export const GameButtons = () => {
  const { t } = useTranslation();
  const state = useAppSelector(selectGameState);

  return (
    <Box mb={[2, 4, 6, 10]} display={'flex'} justifyContent={'center'}>
      <Box maxW={'250px'} w={'full'} display={'flex'} justifyContent={'space-between'}>
        {state === GameState.Explainer && (
          <>
            <GameButton
              tooltip={t('ui.skipCardTooltip')}
              icon={<RedoIcon color={'gray.100'} h={8} w={8} />}
            />
            <GameButton
              tooltip={t('ui.validAnswerTooltip')}
              icon={<CheckIcon color={'green.600'} h={8} w={8} />}
            />
          </>
        )}

        {state === GameState.EnemyTeam && (
          <GameButton
            maxW={{ base: '250px' }}
            width={['250px']}
            tooltip={t('ui.forbiddenWordUsed')}
            icon={<CloseIcon color={'red.500'} h={6} w={6} />}
          />
        )}
      </Box>
    </Box>
  );
};

interface GameButtonProps {
  tooltip: string;
  icon: React.ReactElement;
  width?: string[];
  maxW?: any;
}

const GameButton = ({ tooltip, maxW, width, icon }: GameButtonProps) => {
  const maxWidth = maxW ? maxW : { lg: '120px' };
  const minWidth = width ? width : ['23vw', '15vw', '12vw', '8vw'];

  return (
    <IconButton
      size={'lg'}
      aria-label={tooltip}
      width={minWidth}
      maxW={maxWidth}
      boxShadow={'lg'}
      colorScheme={'whiteAlpha'}
      icon={
        <Tooltip label={tooltip} aria-label={'tooltip'}>
          {icon}
        </Tooltip>
      }
    />
  );
};
