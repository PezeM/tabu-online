import React from 'react';
import { Avatar, AvatarBadge, Box, Text } from '@chakra-ui/react';
import { ClientCP } from '../../../../shared/dto/client.dto';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectOwnerId } from '@/features/lobby/lobby.slice';
import { selectClientId } from '@/features/client/client.splice';

interface Props {
  member: ClientCP;
}

export const TeamMember = ({ member }: Props) => {
  const ownerId = useAppSelector(selectOwnerId);
  const clientId = useAppSelector(selectClientId);
  const isOwner = member.id === ownerId;
  const isClient = member.id === clientId;

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
      <Avatar name={member.username} size={'sm'}>
        {isOwner && <AvatarBadge bg="green.500" boxSize={'1.2em'} />}
        {isClient && <AvatarBadge bg="red.500" boxSize={'1.2em'} left={'-8px'} />}
      </Avatar>

      <Text>{member.username}</Text>
    </Box>
  );
};
