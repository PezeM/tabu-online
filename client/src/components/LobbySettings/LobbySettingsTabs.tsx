import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectIsLobbyOwner, selectLobby, updateCardSets } from '@/features/lobby/lobby.slice';
import { TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PersonalSettingsTab } from '@/components/LobbySettings/PersonalSettingsTab';
import { GameSettingsTab } from '@/components/LobbySettings/GameSettingsTab';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { SERVER_EVENT_NAME } from '../../../../shared/constants';
import { setIsLoading } from '@/features/settings/settings.splice';
import { CardSetsCountDto } from '../../../../shared/dto';
import { showErrorNotification } from '@/utils/notification';
import { CustomTab } from '@/components/TabListTab';
import { HomeIcon } from '@/styles/icons';
import { SettingsIcon } from '@chakra-ui/icons';

export const LobbySettingsTabs = () => {
  const lobbyData = useAppSelector(selectLobby);
  const isLobbyOwner = useAppSelector(selectIsLobbyOwner);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const toast = useToast();

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
    <Tabs variant={'enclosed'} colorScheme={'teal'} isFitted mb={'1em'} overflowY={'auto'}>
      <TabList>
        <CustomTab icon={<HomeIcon />}>{t('ui.personalSettings').toUpperCase()}</CustomTab>
        {isLobbyOwner && (
          <CustomTab icon={<SettingsIcon />}>{t('ui.gameSettings').toUpperCase()}</CustomTab>
        )}
      </TabList>

      <TabPanels>
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
