import React from 'react';
import { Team } from '../../../../shared/enums';
import { Box, Flex, Grid, GridProps, Heading, useColorModeValue } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectGame, selectGameTeams } from '@/features/game/game.slice';
import { RepeatIcon, StarIcon } from '@chakra-ui/icons';

interface Props extends GridProps {
  team: Team;

  [x: string]: any;
}

const styles: Record<Team, GridProps> = {
  [Team.Red]: {
    bg: 'red.500',
    borderRightRadius: '2xl',
    justifyContent: 'flex-start',
  },
  [Team.Blue]: {
    bg: 'blue.500',
    borderLeftRadius: '2xl',
    justifyContent: 'flex-end',
  },
};

export const GameTeamStats = ({ team, ...rest }: Props) => {
  const gameTeams = useAppSelector(selectGameTeams);
  const game = useAppSelector(selectGame);
  const color = useColorModeValue('gray.200', 'gray.800');

  const gameTeam = gameTeams?.[team];
  const style = styles[team];

  if (!gameTeam) {
    return null;
  }

  return (
    <Flex width={'100%'} height={'100%'} {...rest}>
      <Grid
        templateRows={'repeat(2, 1fr)'}
        height={'100%'}
        width={['85%', '70%', '65%', '55%']}
        color={color}
        {...style}
      >
        <Box alignSelf={'center'} display="flex" alignItems={'center'} px={[1, 2, 3]}>
          <StarIcon mr={[1, 2, 3, 4]} w={[5, 6, 7, 8]} h={[5, 6, 7, 8]} color={'yellow.400'} />
          <Heading fontSize={['md', 'lg', 'xl', '2xl']}>
            {gameTeam.points} / {game?.pointsToWin ?? 0}
          </Heading>
        </Box>

        <Box alignSelf={'center'} display="flex" alignItems={'center'} px={[1, 2, 3]}>
          <RepeatIcon
            mr={[1, 2, 3, 4]}
            w={[5, 6, 7, 8]}
            h={[5, 6, 7, 8]}
            color={'whiteAlpha.700'}
          />
          <Heading fontSize={['md', 'lg', 'xl', '2xl']}>
            {gameTeam.numberOfSkips} / {game?.maximumNumberOfSkips ?? 0}
          </Heading>
        </Box>
      </Grid>
    </Flex>
  );
};
