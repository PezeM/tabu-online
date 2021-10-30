import { useTranslation } from 'react-i18next';
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const EmptyCard = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Stack textAlign={'center'} p={3} align={'center'}>
        <Text
          fontSize={'2xl'}
          fontWeight={700}
          p={2}
          px={4}
          color={useColorModeValue('gray.800', 'gray.100')}
          letterSpacing={'2px'}
        >
          {t('ui.guessTheWord')}
        </Text>
      </Stack>
    </Box>
  );
};