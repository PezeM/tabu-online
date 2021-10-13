import React from 'react';
import { Box, Grid } from '@chakra-ui/react';

export const GameStats = () => {
  return (
    <Grid
      marginTop={['2vh', '3vh', '5vh']}
      templateColumns={'repeat(3, 1fr)'}
      justifyItems={'center'}
    >
      <Box alignSelf={'center'}>Points</Box>
      <Box>Time</Box>
      <Box alignSelf={'center'}>Skips</Box>
    </Grid>
  );
};
