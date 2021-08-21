import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';

interface Props {
  name: string;
}

export const TeamMember = ({ name }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={'fit-content'}
      maxW={'20vw'}
      whiteSpace={'nowrap'}
    >
      <Avatar />
      <Text>{name}</Text>
    </Box>
  );
};
