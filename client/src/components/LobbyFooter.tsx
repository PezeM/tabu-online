import React, { useState } from 'react';
import { Grid, useToast } from '@chakra-ui/react';
import { RippledButton } from '@/components/RippledButton';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon, LinkIcon } from '@chakra-ui/icons';
import { useClipboard } from '@/hooks/useClipboard';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectLobbyId } from '@/features/lobby/lobby.slice';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME } from '../../../shared/constants/events';

export const LobbyFooter = () => {
  const { t } = useTranslation();
  const [startGameButtonLoading, setStartGameButtonLoading] = useState(false);
  const [copyLinkButtonLoading, setCopyLinkButtonLoading] = useState(false);
  const [, copyToClipboard] = useClipboard();
  const lobbyId = useAppSelector(selectLobbyId);
  const toast = useToast();

  const startGame = () => {
    console.log('Starting game');
    setStartGameButtonLoading(true);
    socket.emit(CLIENT_EVENT_NAME.TryStartGame);
  };

  const copyInviteLink = async () => {
    setCopyLinkButtonLoading(true);
    const link = `${process.env.REACT_APP_ADDRESS}/invite/${lobbyId}`;
    if (await copyToClipboard(link)) {
      console.log(`Copied invite link ${link}`);
      toast({
        title: t('ui.copyingToClipboard'),
        description: t('ui.inviteLinkCopiedSuccessfully'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      console.error(`Error copying invite link ${link}`);
      toast({
        title: t('ui.copyingToClipboard'),
        description: t('error.copyingToClipboard'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setCopyLinkButtonLoading(false);
  };

  return (
    <Grid
      marginY={[2, 4, 8]}
      gap={6}
      templateColumns={['1fr', 'repeat(2, minmax(20%, 200px))']}
      justifyContent={'center'}
    >
      <RippledButton
        scheme={'purple'}
        leftIcon={<LinkIcon />}
        onClick={() => copyInviteLink()}
        isLoading={copyLinkButtonLoading}
      >
        {t('ui.lobbyCopyInviteLink')}
      </RippledButton>
      <RippledButton
        scheme={'blue'}
        leftIcon={<ArrowRightIcon />}
        onClick={() => startGame()}
        isLoading={startGameButtonLoading}
        loadingText={t('ui.lobbyStartGame')}
      >
        {t('ui.lobbyStartGame')}
      </RippledButton>
    </Grid>
  );
};
