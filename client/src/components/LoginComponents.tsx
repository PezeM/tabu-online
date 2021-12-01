import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement, useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowForwardIcon, LockIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { UserIcon } from '@/styles/icons';

interface Props {
  isLoading?: boolean;
  displayPasswordInput: boolean;
  isPasswordRequired: boolean;
  onSubmit: (username: string, password?: string) => void;
}

export const LoginComponent = ({
  onSubmit,
  displayPasswordInput,
  isPasswordRequired,
  isLoading,
}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const iconColor = useColorModeValue('gray.700', 'gray.200');

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={4} textAlign="left" maxWidth={'30em'}>
        <form onSubmit={onFormSubmit}>
          <FormControl id="username">
            <FormLabel htmlFor="username">{t('ui.username')}</FormLabel>
            <InputGroup mt={4}>
              <InputLeftElement pointerEvents="none" children={<UserIcon color={iconColor} />} />
              <Input
                type="text"
                id="username"
                required={true}
                placeholder={t('ui.username') + '...'}
                onChange={e => setUsername(e.currentTarget.value)}
              />
            </InputGroup>

            {displayPasswordInput && (
              <>
                <FormLabel htmlFor="password" mt={4}>
                  {t('ui.password')}
                </FormLabel>
                <InputGroup mt={4}>
                  <InputLeftElement pointerEvents="none" children={<LockIcon color={iconColor} />} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    required={isPasswordRequired}
                    placeholder={t('ui.password') + '...'}
                    onChange={e => setPassword(e.currentTarget.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPassword(state => !state)}>
                      {showPassword ? t('ui.hide') : t('ui.show')}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </>
            )}

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
