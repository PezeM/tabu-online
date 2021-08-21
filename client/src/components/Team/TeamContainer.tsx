import React from 'react';
import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { Team } from '../../../../shared/enums/client';
import { TeamName } from '@/components/Team/TeamName';
import { TeamMember } from '@/components/Team/TeamMember';

interface Props {
  team: Team;
}

export const TeamContainer = ({ team }: Props) => {
  const members = [
    'eluwa',
    'siema co tam',
    'dasd',
    'pezem',
    'dcao',
    'test d',
    'kolejny',
    'no co tam',
    'sadasd',
    'sadasdadasdas',
    'sadasa',
  ];

  return (
    <Flex
      flexDirection="column"
      height={'fit-content'}
      overflowX="auto"
      alignItems="flex-start"
      width="100%"
    >
      <TeamName team={team} />
      <HStack
        spacing={8}
        alignItems="center"
        width="100%"
        overflowX="auto"
        display={'-webkit-box'}
      >
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

        {members.map(m => (
          <TeamMember key={m} name={m} />
        ))}
      </HStack>
    </Flex>
  );
};
