import { Player } from '@models/player.model';
import { Team } from '@shared/enums';
import * as faker from 'faker';
import { ClientFixture } from '@/tests/fixtures/client.fixture';

export class PlayerFixture {
  static create(team: Team, name: string = faker.name.firstName()): Player {
    return new Player(ClientFixture.create(team, name));
  }
}
