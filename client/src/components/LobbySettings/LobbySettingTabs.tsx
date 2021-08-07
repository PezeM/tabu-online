import React from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectIsLobbyOwner, selectLobby } from '@/features/lobby/lobby.slice';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PersonalSettingTab } from '@/components/LobbySettings/PersonalSettingTab';
import { GameSettingTab } from '@/components/LobbySettings/GameSettingTab';

export const LobbySettingTabs = () => {
  const lobbyData = useAppSelector(selectLobby);
  const isLobbyOwner = useAppSelector(selectIsLobbyOwner);
  const { t } = useTranslation();

  if (!lobbyData) {
    return null;
  }

  return (
    <Tabs variant={'enclosed'} colorScheme={'teal'} isFitted mb={'1em'}>
      <TabList>
        <Tab>{t('ui.personalSettings').toUpperCase()}</Tab>
        {isLobbyOwner && <Tab>{t('ui.gameSettings').toUpperCase()}</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel>
          <PersonalSettingTab />
        </TabPanel>
        {isLobbyOwner && (
          <TabPanel>
            <GameSettingTab />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};
