import React from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const LobbySettingsContainer = React.memo(({ children }: Props) => {
  return (
    <Flex
      flex={'1 1 0%'}
      direction={'column'}
      justifyContent={'space-evenly'}
      height={'90%'}
      gridRowGap={[1, 2, 3]}
    >
      {children}
    </Flex>
  );
});
