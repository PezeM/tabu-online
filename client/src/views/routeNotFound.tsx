import React from 'react';
import { Button, Code, Flex, Text } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { ArrowBackIcon, WarningIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export const RouteNotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  return (
    <Flex
      width="full"
      height={'full'}
      align="center"
      justifyContent="center"
      flexDirection={'column'}
      p={4}
    >
      <WarningIcon color={'red.400'} w={[12, 24]} h={[12, 24]} />
      <Text fontSize={['xl', '3xl', '4xl']} mt={12}>
        {t('ui.routeNotFound')} <Code fontSize={['xl', '2xl', '3xl']}>{location.pathname}</Code>
      </Text>
      <Button
        size={'lg'}
        leftIcon={<ArrowBackIcon />}
        mt={12}
        colorScheme={'blue'}
        variant={'outline'}
        onClick={() => history.goBack()}
      >
        {t('ui.goBack')}
      </Button>
    </Flex>
  );
};
