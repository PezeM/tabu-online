import { Team } from '@shared/enums';
import * as faker from 'faker';
import { Client } from '@models/client.model';
import MockedSocket from 'socket.io-mock';

const testServerSocket = new MockedSocket();

export class ClientFixture {
  static create(team: Team, name: string = faker.name.firstName()): Client {
    const socket = testServerSocket.socketClient;
    socket.join = jest.fn();
    socket.to = jest.fn().mockReturnValue(testServerSocket);
    socket.leave = jest.fn();
    return new Client(socket, name, team);
  }
}
