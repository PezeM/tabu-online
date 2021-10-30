import React, { useState } from 'react';
import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { Team } from '../../../../shared/enums';
import { TeamName } from '@/components/Team/TeamName';
import { TeamMember } from '@/components/Team/TeamMember';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectIsLobbyOwner, selectLobbyMembers } from '@/features/lobby/lobby.slice';
import { ClientCP } from '../../../../shared/dto';
import { generateRandomId } from '../../../../shared/utils';
import { generateRandomInt } from '../../../../shared/utils';
import { selectClient } from '@/features/client/client.splice';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '../../../../shared/constants';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';

const generateRandomMembers = (team: Team, membersNumber = 5): ClientCP[] => {
  return [...Array(membersNumber)].map(_ => ({
    team,
    id: generateRandomId(),
    username: generateRandomInt(10000, 1000000000).toString(),
  }));
};

interface Props {
  team: Team;
}

export const TeamContainer = React.memo(({ team }: Props) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const client = useAppSelector(selectClient);
  const isLobbyOwner = useAppSelector(selectIsLobbyOwner);
  const allMembers = useAppSelector(selectLobbyMembers)?.filter(m => m.team === team);
  const joinButtonBg = useColorModeValue('gray.700', 'gray.700');
  const { t } = useTranslation();

  const showJoinTeamButton = client && client.team !== team;
  const members = [...generateRandomMembers(team), ...allMembers];

  useListenServerEvent(SERVER_EVENT_NAME.LobbyUserChangedTeam, (clientId: string) => {
    if (client?.id === clientId) {
      setIsButtonLoading(false);
    }
  });

  const joinTeam = () => {
    setIsButtonLoading(true);
    socket.emit(CLIENT_EVENT_NAME.ChangeTeam);
  };

  return (
    <Flex
      flexDirection="column"
      height={'fit-content'}
      overflowX="auto"
      alignItems="flex-start"
      width="100%"
      border={'1px'}
      borderRadius={'1em'}
      shadow={'lg'}
      borderStyle={'double'}
    >
      <TeamName team={team} />
      <HStack
        spacing={[4, 5, 6]}
        alignItems="center"
        width="100%"
        overflowX="auto"
        display={'-webkit-box'}
        pb={2}
      >
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          {showJoinTeamButton && (
            <Button
              bg={joinButtonBg}
              color={'white'}
              rounded={'md'}
              isLoading={isButtonLoading}
              onClick={joinTeam}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              {t('ui.team.join')}
            </Button>
          )}
        </Box>

        {members.map(member => (
          <TeamMember key={member.id} member={member} isLobbyOwner={isLobbyOwner} />
        ))}
      </HStack>
    </Flex>
  );
});
