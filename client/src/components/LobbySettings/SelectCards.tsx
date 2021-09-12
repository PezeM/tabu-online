import React from 'react';
import { Grid, Text } from '@chakra-ui/react';
import { RippledButton } from '@/components/RippledButton';

export const SelectCards = () => {
  return (
    <Grid templateColumns={['10fr 7fr', '10fr 4fr', '10fr 7fr', '10fr 5fr', '10fr 4fr']}>
      <RippledButton size={'sm'}>Select cards</RippledButton>
      <Text pl={[4, 6, 8]}>0 cards</Text>
    </Grid>
  );
};
