import React from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const LobbySettingsContainer = ({ children }: Props) => {
  return (
    <Flex
      flex={'1 1 0%'}
      direction={'column'}
      justifyContent={'space-around'}
      height={'100%'}
      gridRowGap={[2, 3, 5]}
    >
      {children}
    </Flex>
  );
};
