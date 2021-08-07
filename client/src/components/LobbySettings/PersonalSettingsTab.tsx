import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SettingsBox } from '@/components/LobbySettings/SettingsBox';
import { LobbySettingsContainer } from '@/components/LobbySettings/LobbySettingsContainer';
import { PizzaSliceIcon } from '@/styles/icons';

export const PersonalSettingsTab = () => {
  return (
    <LobbySettingsContainer>
      <SettingsBox
        title={'Change UI Language'}
        icon={<PizzaSliceIcon />}
        description={
          'Some random text xd zxdx d dx dx dx dx dx xd dx das das asd das dadahdjkadajssdabhdas ksadjbdajadb s'
        }
      >
        <Box>
          <Text>Random other component</Text>
        </Box>
      </SettingsBox>
      <SettingsBox title={'Change UI Language'} />
      <SettingsBox title={'Change UI Language'} />
      <SettingsBox title={'Change UI Language'} />
      <SettingsBox title={'Change UI Language'} />
      <Text>Change UI language</Text>
      <Text>Change theme to dark/light</Text>
      <Text>Enable / disable sounds</Text>
      <Text>Maybe Change text scale</Text>
      <Text>Maybe change avatar colour</Text>
    </LobbySettingsContainer>
  );
};
