import { Team } from '../../../shared/enums/client';

export const getTeamColor = (team: Team): string => {
  switch (team) {
    case Team.Blue:
      return 'blue'
    case Team.Red:
      return 'red';
  }
};
