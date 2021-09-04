import React from 'react';
import { IconButton, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export const ToggleColorModeButton = (props: any) => {
  const { toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const text = useColorModeValue(t('ui.switchToDarkMode'), t('ui.switchToLightMode'));

  return (
    <Tooltip label={text} aria-label={text}>
      <IconButton
        size="lg"
        fontSize="lg"
        aria-label={text}
        variant="ghost"
        color="current"
        onClick={toggleColorMode}
        icon={<SwitchIcon width={[8, 10]} height={[8, 10]} />}
        {...props}
      />
    </Tooltip>
  );
};