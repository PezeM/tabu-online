import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { Team } from '@shared/enums/client';
import { app } from '@/server';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';

export class LobbyService {
  changeTeam(client: Client, lobby: Lobby) {
    client.team = client.team === Team.Blue ? Team.Red : Team.Blue;

    // Emit to all users in lobby that user changed team
    app
      .ioServer()
      .in(lobby.id)
      .emit(SERVER_EVENT_NAME.LobbyUserChangedTeam, client.id, client.team);
  }

  public async startGame(client: Client) {
    const lobby = lobbyManager.getLobbyForClient(client);
    if (!lobby) return;

    
  }
}
