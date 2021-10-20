import React from 'react';
import { Team } from '../../../../shared/enums';
import { Box, Grid, GridProps } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGameTeams } from '@/features/game/game.slice';

interface Props extends GridProps {
  team: Team;

  [x: string]: any;
}

const styles: Record<Team, GridProps> = {
  [Team.Red]: {
    bg: 'red.700',
    borderRightRadius: '2xl',
    justifyContent: 'flex-start',
  },
  [Team.Blue]: {
    bg: 'blue.500',
    borderLeftRadius: '2xl',
    justifyContent: 'flex-end',
  }
}

export const GameTeamStats = ({team, ...rest}: Props) => {
  const gameTeams = useAppSelector(selectGameTeams);

  const gameTeam = gameTeams?.[team];
  const style = styles[team];

  if (!gameTeam) {
    return null;
  }

  return (
    <Box width={'100%'} height={'100%'} {...rest}>
      <Grid templateRows={'repeat(2, 1fr)'} height={'100%'} {...style}>
        <Box>
          Name and points
        </Box>

        <Box>
          Number of Skips
        </Box>
      </Grid>
    </Box>
  )
}
