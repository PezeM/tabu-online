import React from 'react';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export const GameButtons = () => {
  const { t } = useTranslation();

  return (
    <Box mb={[2, 4, 6, 10]} display={'flex'} justifyContent={'center'}>
      <Box maxW={'250px'} w={'full'} display={'flex'} justifyContent={'space-between'}>
        {/*<GameButton tooltip={t('ui.skipCardTooltip')} />*/}
        {/*<GameButton tooltip={t('ui.validAnswerTooltip')} />*/}
        <GameButton
          maxW={{ base: '250px' }}
          width={['250px']}
          tooltip={t('ui.forbiddenWordUsed')}
        />
      </Box>
    </Box>
  );
};

interface GameButtonProps {
  tooltip: string;
  width?: string[];
  maxW?: any;
}

const GameButton = ({ tooltip, maxW, width }: GameButtonProps) => {
  const maxWidth = maxW ? maxW : { lg: '120px' };
  const minWidth = width ? width : ['23vw', '15vw', '12vw', '8vw'];

  return (
    <IconButton
      size={'lg'}
      aria-label={tooltip}
      width={minWidth}
      maxW={maxWidth}
      icon={
        <Tooltip label={tooltip} aria-label={'tooltip'}>
          <SearchIcon />
        </Tooltip>
      }
    />
  );
};
