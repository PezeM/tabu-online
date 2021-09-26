import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectIsLobbyOwner, selectLobby, updateCardSets } from '@/features/lobby/lobby.slice';
import { Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PersonalSettingsTab } from '@/components/LobbySettings/PersonalSettingsTab';
import { GameSettingsTab } from '@/components/LobbySettings/GameSettingsTab';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { SERVER_EVENT_NAME } from '../../../../shared/constants';
import { setIsLoading } from '@/features/settings/settings.splice';
import { CardSetsCountDto } from '../../../../shared/dto';
import { showErrorNotification } from '@/utils/notification';

export const LobbySettingsTabs = () => {
  const lobbyData = useAppSelector(selectLobby);
  const isLobbyOwner = useAppSelector(selectIsLobbyOwner);
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    console.log('Is mobile', isMobile);
  }, [isMobile]);

  useListenServerEvent(SERVER_EVENT_NAME.LobbySettingsUpdateFailed, (msg: string) => {
    dispatch(setIsLoading(false));
    showErrorNotification(toast, msg);
  });

  useListenServerEvent(SERVER_EVENT_NAME.UpdateCardSets, (cardSets: CardSetsCountDto[]) => {
    dispatch(updateCardSets(cardSets));
  });

  if (!lobbyData) {
    return null;
  }

  return (
    <Tabs variant={'enclosed'} colorScheme={'teal'} isFitted mb={'1em'}>
      <TabList>
        <Tab>{t('ui.personalSettings').toUpperCase()}</Tab>
        {isLobbyOwner && <Tab>{t('ui.gameSettings').toUpperCase()}</Tab>}
      </TabList>

      <TabPanels height={'100%'}>
        <TabPanel height={'100%'}>
          <PersonalSettingsTab />
        </TabPanel>
        {isLobbyOwner && (
          <TabPanel height={'100%'}>
            <GameSettingsTab />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};
