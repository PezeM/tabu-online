import React from 'react';
import { Avatar, Box, Button, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { Team } from '../../../../shared/enums/client';
import { TeamName } from '@/components/Team/TeamName';

interface Props {
  team: Team;
}

export const TeamContainer = ({ team }: Props) => {
  return (
    <Flex
      flexDirection="column"
      height={'fit-content'}
      overflowX="auto"
      alignItems="flex-start"
      width="100%"
    >
      <TeamName team={team} />
      <HStack spacing={8} alignItems="center" width="100%" overflowX="auto">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Button
            bg={useColorModeValue('#151f21', 'gray.700')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Follow
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar />
          <Text>Text value</Text>
        </Box>
      </HStack>
    </Flex>
  );
};
