import React from 'react';
import { VStack } from '@chakra-ui/react';
import { TeamContainer } from '@/components/Team/TeamContainer';
import { Team } from '../../../../shared/enums';

export const TeamsContainer = React.memo(() => (
  <VStack spacing={[2, 4]} overflowX="auto" height="fit-content">
    <TeamContainer team={Team.Red} />
    <TeamContainer team={Team.Blue} />
  </VStack>
));