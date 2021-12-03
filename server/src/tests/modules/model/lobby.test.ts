import { ClientFixture } from '@/tests/fixtures/client.fixture';
import { Team } from '@shared/enums';
import { Lobby } from '@models/lobby.model';
import { Client } from '@models/client.model';
import { LobbyFixture } from '@/tests/fixtures/lobby.fixture';
import { LobbyAddClientException } from '@/exceptions';
import { app } from '@/server';

describe('Lobby', () => {
  let lobby: Lobby;
  let client: Client;

  beforeEach(() => {
    lobby = LobbyFixture.create(ClientFixture.create(Team.Blue));
    client = ClientFixture.create(Team.Blue);
  });

  afterAll(() => {
    app.databaseConnection()?.disconnect();
  });

  it('should add client', () => {
    lobby.addClient(client);

    expect(lobby.membersCount).toBe(2);
  });

  it('should remove client', () => {
    lobby.addClient(client);
    lobby.removeClient(client);

    expect(lobby.membersCount).toBe(1);
  });

  it('should not remove client if not in lobby', () => {
    lobby.removeClient(client);

    expect(lobby.membersCount).toBe(1);
  });

  it('should not add client if full', () => {
    lobby.settings.maxPlayers = 4;
    lobby.addClient(client);
    lobby.addClient(ClientFixture.create(Team.Red));
    lobby.addClient(ClientFixture.create(Team.Red));
    expect(() => lobby.addClient(ClientFixture.create(Team.Red))).toThrow(LobbyAddClientException);

    expect(lobby.membersCount).toBe(4);
  });

  it('should not add client if already in lobby', () => {
    lobby.addClient(client);
    expect(() => lobby.addClient(client)).toThrow(LobbyAddClientException);
    expect(lobby.membersCount).toBe(2);
  });

  it('should check if client is owner', () => {
    lobby.addClient(client);

    expect(lobby.isOwner(client)).toBe(false);
  });
});
