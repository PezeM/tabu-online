import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { ClientCP } from '../../../../shared/dto';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectOwnerId } from '@/features/lobby/lobby.slice';
import { selectClientId } from '@/features/client/client.splice';
import { MemberBadge } from '@/components/Team/MemberBadge';
import { CrownIcon, UserIcon } from '@/styles/icons';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@chakra-ui/icons';
import { setIsLoading } from '@/features/settings/settingsSlice';
import { socketService } from '@/services/socket.service';

interface Props {
  member: ClientCP;
  isLobbyOwner: boolean;
}

export const TeamMember = ({ member, isLobbyOwner }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const ownerId = useAppSelector(selectOwnerId);
  const clientId = useAppSelector(selectClientId);
  const isOwner = member.id === ownerId;
  const isClient = member.id === clientId;
  const canKick = isLobbyOwner && !isClient;

  const kickPlayer = () => {
    socketService.lobbyKickClient(member.id);
    dispatch(setIsLoading(true));
  };

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
        {isOwner && (
          <MemberBadge
            bottom={'-12px'}
            right={'2px'}
            bg={'cyan.400'}
            tooltip={t('ui.gameOwnerTooltip')}
          >
            <CrownIcon w={'0.85rem'} h={'0.85rem'} />
          </MemberBadge>
        )}
        {isClient && (
          <MemberBadge
            bottom={'-12px'}
            right={'30px'}
            bg={'purple.400'}
            tooltip={t('ui.clientTooltip')}
          >
            <UserIcon w={'0.85rem'} h={'0.85rem'} />
          </MemberBadge>
        )}

        {canKick && (
          <MemberBadge
            bottom={'-12px'}
            right={'30px'}
            bg={'red.500'}
            tooltip={t('ui.kickClientTooltip')}
            onClick={kickPlayer}
            transition="all 0.2s ease-in"
            padding={'0.2rem'}
            _hover={{
              bg: 'red.600',
              color: 'gray.800',
            }}
          >
            <CloseIcon w={'0.60rem'} h={'0.60rem'} />
          </MemberBadge>
        )}
      </Avatar>

      <Text>{member.username}</Text>
    </Box>
  );
};
