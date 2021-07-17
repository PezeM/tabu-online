import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '../../../shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';

export class Auth2Service {
  public createLobby(owner: Client) {
    if (lobbyManager.getLobbyForSocketId(owner.socketId)) {
      owner.socket.emit(SERVER_EVENT_NAME.UserCouldntCreateLobby, 'Jestes jzu w tym lobby');
      return;
    }

    // create lobby
    // add user as owner lobby

    const lobby = new Lobby(owner);
    lobbyManager.addLobby(lobby);
    owner.socket.emit(SERVER_EVENT_NAME.UserJoinLobby);
    owner.socket.to(lobby.id).emit(SERVER_EVENT_NAME.UserJoinedLobby, owner.id);
  }
}
