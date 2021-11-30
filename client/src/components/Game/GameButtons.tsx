import React from 'react';
import { Box, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCurrentCard, selectGameState } from '@/features/game/game.slice';
import { GameState } from '@/types/game-state.enum';
import { RedoIcon } from '@/styles/icons';
import { socketService } from '@/services/socket.service';

export const GameButtons = () => {
  const { t } = useTranslation();
  const state = useAppSelector(selectGameState);
  const currentCard = useAppSelector(selectCurrentCard);
  const skipIconColor = useColorModeValue('gray.500', 'gray.100');

  const skipCard = () => {
    if (!currentCard) return;
    socketService.gameSkipCard(currentCard.name);
  };

  const validAnswer = () => {
    if (!currentCard) return;
    socketService.gameValidAnswer(currentCard.name);
  };

  const forbiddenWordUsed = () => {
    if (!currentCard) return;
    socketService.gameForbiddenWordUsed(currentCard.name);
  };

  return (
    <Box mb={[2, 4, 6, 10]} display={'flex'} justifyContent={'center'}>
      <Box maxW={'250px'} w={'full'} display={'flex'} justifyContent={'space-between'}>
        {state === GameState.Explainer && (
          <>
            <GameButton
              tooltip={t('ui.skipCardTooltip')}
              icon={<RedoIcon color={skipIconColor} h={8} w={8} />}
              onClick={skipCard}
            />
            <GameButton
              tooltip={t('ui.validAnswerTooltip')}
              icon={<CheckIcon color={'green.600'} h={8} w={8} />}
              onClick={validAnswer}
            />
          </>
        )}

        {state === GameState.EnemyTeam && (
          <GameButton
            maxW={{ base: '250px' }}
            width={['250px']}
            tooltip={t('ui.forbiddenWordUsed')}
            icon={<CloseIcon color={'red.500'} h={6} w={6} />}
            onClick={forbiddenWordUsed}
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
  onClick: () => void;
}

const GameButton = ({ tooltip, maxW, width, icon, onClick }: GameButtonProps) => {
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
      onClick={onClick}
      icon={
        <Tooltip label={tooltip} aria-label={'tooltip'}>
          {icon}
        </Tooltip>
      }
    />
  );
};
