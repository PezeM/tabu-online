import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';

export const MainSkeleton = () => {
  return (
    <Stack height={'100vh'} width={'100vw'} spacing={4} align="stretch">
      <Skeleton height={'30vh'} />
      <Skeleton height={'30vh'} />
      <Skeleton height={'30vh'} />
    </Stack>
  );
};
