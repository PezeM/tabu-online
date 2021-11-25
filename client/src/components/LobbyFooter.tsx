import React, { useState } from 'react';
import { Grid, useToast } from '@chakra-ui/react';
import { RippledButton } from '@/components/RippledButton';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon, LinkIcon } from '@chakra-ui/icons';
import { useClipboard } from '@/hooks/useClipboard';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectIsLobbyOwner, selectLobbyId } from '@/features/lobby/lobby.slice';
import { socketService } from '@/services/socket';
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { setIsLoading } from '@/features/settings/settings.splice';
import { showErrorNotification, showNotification } from '@/utils/notification';

export const LobbyFooter = React.memo(() => {
  const { t } = useTranslation();
  const [copyLinkButtonLoading, setCopyLinkButtonLoading] = useState(false);
  const [, copyToClipboard] = useClipboard();
  const lobbyId = useAppSelector(selectLobbyId);
  const isLobbyOwner = useAppSelector(selectIsLobbyOwner);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const gridTemplateColumns = [
    '1fr',
    isLobbyOwner ? 'repeat(2, minmax(20%, 200px))' : 'minmax(20%, 200px)'
  ];

  const startGame = () => {
    dispatch(setIsLoading(true));
    socketService.tryStartGame();
  };

  const copyInviteLink = async () => {
    const link = `${process.env.REACT_APP_ADDRESS}/invite/${lobbyId}`;
    setCopyLinkButtonLoading(true);

    if (await copyToClipboard(link)) {
      console.log(`Copied invite link ${link}`);

      showNotification(toast, 'ui.inviteLinkCopiedSuccessfully', { title: t('ui.copyingToClipboard') });
    } else {
      console.error(`Error copying invite link ${link}`);
      showErrorNotification(toast, 'error.copyingToClipboard', { title: t('ui.copyingToClipboard') });
    }

    setCopyLinkButtonLoading(false);
  };

  useListenServerEvent(SERVER_EVENT_NAME.StartGameFailed, (msg: string) => {
    dispatch(setIsLoading(false));
    showErrorNotification(toast, msg);
  });

  useListenServerEvent(SERVER_EVENT_NAME.ErrorCreatingGame, (msg: string) => {
    dispatch(setIsLoading(false));
    showErrorNotification(toast, msg);
  });

  return (
    <Grid
      marginY={[2, 4, 8]}
      gap={6}
      templateColumns={gridTemplateColumns}
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
      {isLobbyOwner && <RippledButton
        scheme={'blue'}
        leftIcon={<ArrowRightIcon />}
        onClick={() => startGame()}
        loadingText={t('ui.lobbyStartGame')}
      >
        {t('ui.lobbyStartGame')}
      </RippledButton>}
    </Grid>
  );
});
