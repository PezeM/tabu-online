import React from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const LobbySettingsContainer = ({ children }: Props) => {
  return (
    <Flex flex={'1 1 0%'} direction={'column'} justifyContent={'space-between'} height={'100%'}>
      {children}
    </Flex>
  );
};