import { useAppSelector } from '@/hooks/reduxHooks';
import { selectIsLoading } from '@/features/settings/settings.splice';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const LoadingSpinnerOverlay = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const bgColor = useColorModeValue('rgba(20, 20, 20, 0.25)', 'rgba(220, 220, 220, 0.25)');

  if (!isLoading) {
    return null;
  }

  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      zIndex={'1000'}
      position={'absolute'}
      backgroundColor={bgColor}
      backdropFilter={'blur(3px)'}
    >
      <Spinner size={'xl'} />
    </Box>
  );
};