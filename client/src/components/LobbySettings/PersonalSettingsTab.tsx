import React from 'react';
import { Box } from '@chakra-ui/react';
import { SettingsBox } from '@/components/LobbySettings/SettingsBox';
import { LobbySettingsContainer } from '@/components/LobbySettings/LobbySettingsContainer';
import { ColorSwatchIcon, GlobeIcon, SoundIcon, TextIcon } from '@/styles/icons';
import { useTranslation } from 'react-i18next';
import { ChangeLanguageSelect } from '@/components/LobbySettings/ChangeLanguageSelect';
import { ToggleColorModeButton } from '@/components/ToggleColorModeButton';
import { ChangeFontScaleSelect } from '@/components/LobbySettings/ChangeFontScaleSelect';
import { ToggleSoundsButton } from '@/components/LobbySettings/ToggleSoundsButton';

export const PersonalSettingsTab = React.memo(() => {
  const { t } = useTranslation();

  return (
    <LobbySettingsContainer>
      <SettingsBox
        title={t('ui.changeUiLanguage')}
        icon={<GlobeIcon />}
        description={t('ui.changeUiLanguageDescription')}
      >
        <ChangeLanguageSelect />
      </SettingsBox>
      <SettingsBox
        title={t('ui.changeUiTheme')}
        icon={<ColorSwatchIcon />}
        description={t('ui.changeUiThemeDescription')}
      >
        <Box
          alignItems={'center'}
          width={'100%'}
          height={'100%'}
          display={'flex'}
          justifyContent={'center'}
        >
          <ToggleColorModeButton />
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.toggleSounds')}
        icon={<SoundIcon />}
        description={t('ui.toggleSoundsDescription')}
      >
        <Box
          alignItems={'center'}
          width={'100%'}
          height={'100%'}
          display={'flex'}
          justifyContent={'center'}
        >
          <ToggleSoundsButton />
        </Box>
      </SettingsBox>
      <SettingsBox
        title={t('ui.changeTextScale')}
        icon={<TextIcon />}
        description={t('ui.changeTextScaleDescription')}
      >
        <ChangeFontScaleSelect />
      </SettingsBox>
    </LobbySettingsContainer>
  );
});
