import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SettingsBox } from '@/components/LobbySettings/SettingsBox';
import { LobbySettingsContainer } from '@/components/LobbySettings/LobbySettingsContainer';
import { PizzaSliceIcon } from '@/styles/icons';
import { useTranslation } from 'react-i18next';

export const PersonalSettingsTab = () => {
  const { t } = useTranslation();

  return (
    <LobbySettingsContainer>
      <SettingsBox
        title={t('ui.changeUiLanguage')}
        icon={<PizzaSliceIcon />}
        description={t('ui.changeUiLanguageDescription')}
      >
        <Box>
          <Text>Random other component</Text>
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.changeUiTheme')}
        icon={<PizzaSliceIcon />}
        description={t('ui.changeUiThemeDescription')}
      >
        <Box>
          <Text>Random other component</Text>
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.toggleSounds')}
        icon={<PizzaSliceIcon />}
        description={t('ui.toggleSoundsDescription')}
      >
        <Box>
          <Text>Random other component</Text>
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.changeTextScale')}
        icon={<PizzaSliceIcon />}
        description={t('ui.changeTextScaleDescription')}
      >
        <Box>
          <Text>Random other component</Text>
        </Box>
      </SettingsBox>
    </LobbySettingsContainer>
  );
};
