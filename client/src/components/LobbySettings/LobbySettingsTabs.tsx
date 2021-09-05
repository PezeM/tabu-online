import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectIsLobbyOwner, selectLobby } from '@/features/lobby/lobby.slice';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PersonalSettingsTab } from '@/components/LobbySettings/PersonalSettingsTab';
import { GameSettingsTab } from '@/components/LobbySettings/GameSettingsTab';
import { useIsMobile } from '@/hooks/useIsMobile';

export const LobbySettingsTabs = () => {
  const lobbyData = useAppSelector(selectLobby);
  const isLobbyOwner = useAppSelector(selectIsLobbyOwner);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    console.log('Is mobile', isMobile);
  }, [isMobile]);

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
