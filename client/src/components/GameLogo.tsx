import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export const GameLogo = () => {
  return (
    <Box
      position="absolute"
      margin={'auto'}
      left={0}
      right={0}
      textAlign={'center'}
      top={['1.25%', '2.5%', '4.5%', '8%']}
    >
      <Heading>Game logo</Heading>
    </Box>
  );
};
