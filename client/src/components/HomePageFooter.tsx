import React from 'react';
import { Container, Stack, Text } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/all';
import { SocialButton } from '@/components/SocialButton';

export const HomePageFooter = () => {
  return (
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      direction={{ base: 'column', sm: 'row' }}
      spacing={4}
      justify={{ base: 'end', sm: 'space-between' }}
      align={{ base: 'center', sm: 'end' }}
    >
      <Text>© 2021 Tabu online. All rights reserved</Text>
      <Stack direction={'row'} spacing={6} justify={'center'} width={{ base: '100%', sm: 'auto' }}>
        <SocialButton label={'Twitter'} href={'#'}>
          <FaTwitter />
        </SocialButton>
        <SocialButton label={'YouTube'} href={'#'}>
          <FaYoutube />
        </SocialButton>
        <SocialButton label={'Instagram'} href={'#'}>
          <FaInstagram />
        </SocialButton>
      </Stack>
    </Container>
  );
};
