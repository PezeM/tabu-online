import React from 'react';
import { Box, Select, Text } from '@chakra-ui/react';
import { SettingsBox } from '@/components/LobbySettings/SettingsBox';
import { LobbySettingsContainer } from '@/components/LobbySettings/LobbySettingsContainer';
import { PizzaSliceIcon } from '@/styles/icons';
import { useTranslation } from 'react-i18next';
import { getLanguageCodeOnly } from '@/utils/browser';

export const PersonalSettingsTab = () => {
  const { t, i18n } = useTranslation();

  console.log(i18n);

  const currentLanguage = getLanguageCodeOnly(i18n.language);
  const languages = Array.from(new Set(i18n.languages.map(getLanguageCodeOnly)));

  return (
    <LobbySettingsContainer>
      <SettingsBox
        title={t('ui.changeUiLanguage')}
        icon={<PizzaSliceIcon />}
        description={t('ui.changeUiLanguageDescription')}
      >
        <Box>
          <Select defaultValue={currentLanguage}>
            {languages.map(l => (
              <option value={l}>{l}</option>
            ))}
          </Select>
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.changeUiTheme')}
        icon={<PizzaSliceIcon />}
        description={t('ui.changeUiThemeDescription')}
      >
        <Box>
          <Text variant={'description'}>Random other component</Text>
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.toggleSounds')}
        icon={<PizzaSliceIcon />}
        description={t('ui.toggleSoundsDescription')}
      >
        <Box>
          <Text variant={'accentAlternative'}>Random other component</Text>
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.changeTextScale')}
        icon={<PizzaSliceIcon />}
        description={t('ui.changeTextScaleDescription')}
      >
        <Box>
          <Text variant={'accent'}>Random other component</Text>
        </Box>
      </SettingsBox>
    </LobbySettingsContainer>
  );
};
