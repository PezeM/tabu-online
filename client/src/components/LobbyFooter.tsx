import React from 'react';
import { Grid } from '@chakra-ui/react';
import { RippledButton } from '@/components/RippledButton';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon, LinkIcon } from '@chakra-ui/icons';

export const LobbyFooter = () => {
  const { t } = useTranslation();

  const startGame = () => {
    console.log('Starting game');
  };

  const copyInviteLink = () => {
    console.log('Copying invite link');
  };

  return (
    <Grid
      marginY={[2, 4, 8]}
      gap={6}
      templateColumns={['1fr', 'repeat(2, minmax(20%, 200px))']}
      justifyContent={'center'}
    >
      <RippledButton scheme={'purple'} leftIcon={<LinkIcon />} onClick={() => copyInviteLink()}>
        {t('ui.lobbyCopyInviteLink')}
      </RippledButton>
      <RippledButton scheme={'blue'} leftIcon={<ArrowRightIcon />} onClick={() => startGame()}>
        {t('ui.lobbyStartGame')}
      </RippledButton>
    </Grid>
  );
};
