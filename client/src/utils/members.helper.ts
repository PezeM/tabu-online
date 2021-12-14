import { Team } from '../../../shared/enums';
import { ClientCP } from '../../../shared/dto';
import { generateRandomId, generateRandomInt } from '../../../shared/utils';

export const generateRandomMembers = (team: Team, membersNumber = 5): ClientCP[] => {
  let generateUsername: () => string;

  if (process.env.NODE_ENV !== 'production') {
    generateUsername = () => generateRandomInt(100000, 1000000000).toString();
  } else {
    import('faker').then(({ internet }) => {
      generateUsername = () => internet.userName();
    });
  }

  return [...Array(membersNumber)].map(_ => ({
    team,
    id: generateRandomId(),
    username: generateUsername(),
  }));
};
