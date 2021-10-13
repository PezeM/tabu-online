import React from 'react';
import { Box } from '@chakra-ui/react';

export const GameButtons = () => {
  return (
    <Box mb={[2, 4, 6, 10]}>
      Depending on state
      Show different buttons

      For explainer - Approve button and skip
      For enemy team - Skip button
      For own team - Nothing
    </Box>
  )
}