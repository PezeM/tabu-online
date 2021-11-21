import React from 'react';
import { ToggleColorModeButton } from '@/components/ToggleColorModeButton';
import { Box } from '@chakra-ui/react';

export const HomePageHeader = () => {
  return (
    <Box p={4}>
      <ToggleColorModeButton />
    </Box>
  )
}