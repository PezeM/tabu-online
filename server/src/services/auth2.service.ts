import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';

export class Auth2Service {
  public createLobby(owner: Client) {
    if (lobbyManager.getLobbyForSocketId(owner.socketId)) {
      owner.socket.emit(SERVER_EVENT_NAME.UserCouldntCreateLobby);
      owner.socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.userAlreadyInLobby', 'Error');
      return;
    }

    const lobby = new Lobby(owner);
    lobbyManager.addLobby(lobby);
  }

  public joinLobby(client: Client, lobbyId: string) {
    const lobby = lobbyManager.getLobby(lobbyId);

    if (!lobby) {
      client.socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.doesntExist', 'Error');
      return;
    }

    // Add client to lobby
    try {
      lobby.addClient(client);
    } catch (e) {
      client.socket.emit(SERVER_EVENT_NAME.Notification, e.message, 'Error');
    }
  }
}
