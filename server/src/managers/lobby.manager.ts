import { Lobby } from '@models/lobby.model';
import { isEmpty } from '@utils/util';

class LobbyManager {
  private _lobbies: Map<string, Lobby>;

  constructor() {
    this._lobbies = new Map();
  }

  public addLobby(lobby: Lobby): Lobby {
    if (isEmpty(lobby)) throw new Error('Lobby object is empty');

    this._lobbies.set(lobby.id, lobby);

    return lobby;
  }

  public removeLobby(lobby: Lobby): boolean {
    if (isEmpty(lobby)) throw new Error('Lobby object is empty');

    return this._lobbies.delete(lobby.id);
  }

  public getLobby(id: string): Lobby | undefined {
    return this._lobbies.get(id);
  }

  /**
   * Return lobby that the user is in
   * @param {string} socketId The socket id, not client id
   * @returns {Lobby | undefined} Returns lobby if user is in any lobby, undefined if he is not in lobby
   */
  public getLobbyForSocketId(socketId: string): Lobby | undefined {
    for (const lobby of this._lobbies.values()) {
      if (lobby.members.some(c => c.socketId === socketId)) {
        return lobby;
      }
    }
  }
}

export const lobbyManager = new LobbyManager();
