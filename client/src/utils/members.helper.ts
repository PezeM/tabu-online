import { Team } from '../../../shared/enums';
import { ClientCP } from '../../../shared/dto';
import { generateRandomId } from '../../../shared/utils';
import * as faker from 'faker';

export const generateRandomMembers = (team: Team, membersNumber = 5): ClientCP[] => {
  return [...Array(membersNumber)].map(_ => ({
    team,
    id: generateRandomId(),
    username: faker.internet.userName(),
  }));
};
