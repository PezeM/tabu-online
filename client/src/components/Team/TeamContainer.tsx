import React from 'react';
import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { Team } from '../../../../shared/enums/client';
import { TeamName } from '@/components/Team/TeamName';
import { TeamMember } from '@/components/Team/TeamMember';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectLobbyMembers } from '@/features/lobby/lobby.slice';
import { ClientCP } from '../../../../shared/dto/client.dto';
import { generateRandomId } from '../../../../shared/utils/uuid';
import { generateRandomInt } from '../../../../shared/utils/number';

interface Props {
  team: Team;
}

const generateRandomMembers = (team: Team, membersNumber = 5): ClientCP[] => {
  return [...Array(membersNumber)].map(_ => ({
    team,
    id: generateRandomId(),
    username: generateRandomInt(10000, 1000000000).toString(),
  }));
};

export const TeamContainer = ({ team }: Props) => {
  const { t } = useTranslation();
  const allMembers = useAppSelector(selectLobbyMembers)?.filter(m => m.team === team);

  const members = [...generateRandomMembers(team), ...allMembers];

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
        pb={[2, 3]}
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
            {t('ui.team.join')}
          </Button>
        </Box>

        {members.map(member => (
          <TeamMember key={member.id} member={member} />
        ))}
      </HStack>
    </Flex>
  );
};
