import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

interface Props {
  isLoading?: boolean;
  onSubmit: (username: string) => void;
}

export const LoginComponent = ({ onSubmit, isLoading }: Props) => {
  const [username, setUsername] = useState('');
  const { t } = useTranslation();

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={4} textAlign="left" maxWidth={'30em'}>
        <form onSubmit={onFormSubmit}>
          <FormControl id="username" isRequired>
            <FormLabel htmlFor="username">{t('ui.username')}</FormLabel>
            <Input
              mt={4}
              type="text"
              id="username"
              placeholder={t('ui.username') + '...'}
              onChange={e => setUsername(e.currentTarget.value)}
            />

            <Button
              leftIcon={<ArrowForwardIcon />}
              mt={8}
              colorScheme="teal"
              width={'full'}
              type="submit"
              isLoading={isLoading}
              loadingText={t('ui.loadingText')}
            >
              {t('ui.submit')}
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};
