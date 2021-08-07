import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const SettingsBox = ({ title, description, children }: Props) => {
  return (
    <Flex direction={'row'} alignItems={'center'}>
      <Box flex={'1 1 auto'}>
        <Text>{title}</Text>
      </Box>
      <Box flex={'1 1 auto'} marginLeft={8}>
        {children && children}
      </Box>
    </Flex>
  );
};
