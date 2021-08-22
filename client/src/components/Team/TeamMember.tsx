import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { ClientCP } from '../../../../shared/dto/client.dto';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectOwnerId } from '@/features/lobby/lobby.slice';
import { selectClientId } from '@/features/client/client.splice';
import { MemberBadge } from '@/components/Team/MemberBadge';
import { CrownIcon, UserIcon } from '@/styles/icons';
import { useTranslation } from 'react-i18next';

interface Props {
  member: ClientCP;
}

export const TeamMember = ({ member }: Props) => {
  const { t } = useTranslation();

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
      </Avatar>

      <Text>{member.username}</Text>
    </Box>
  );
};
