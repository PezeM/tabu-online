import React from 'react';
import { Team } from '../../../../shared/enums';
import { Box, Grid } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGameTeams } from '@/features/game/game.slice';

interface Props {
  team: Team;
}

export const GameTeamStats = ({team}: Props) => {
  const gameTeams = useAppSelector(selectGameTeams);

  const gameTeam = gameTeams?.[team];

  if (!gameTeam) {
    return null;
  }

  return (
    <Grid templateRows={'repeat(2, 1fr)'}>
      <Box>
        Name and points
      </Box>

      <Box>
        Number of Skips
      </Box>
    </Grid>
  )
}
