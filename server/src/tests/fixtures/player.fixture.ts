import { Player } from '@models/player.model';
import { Team } from '@shared/enums';
import { Client } from '@models/client.model';
import MockedSocket from 'socket.io-mock';
import * as faker from 'faker';

const testServerSocket = new MockedSocket();

export class PlayerFixture {
  static create(team: Team, name: string = faker.name.firstName()): Player {
    return new Player(new Client(testServerSocket.socketClient, name, team));
  }
}
