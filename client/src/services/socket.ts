import { io, Socket } from 'socket.io-client';
import { EventsFromClient, EventsFromServer } from '../../../shared/socket';
import { CLIENT_EVENT_NAME } from '../../../shared/constants';
import { LobbySettings } from '../../../shared/interfaces';

class SocketService {
  public readonly socket: Socket<EventsFromServer, EventsFromClient> = io(
    process.env.REACT_APP_SERVER_URL as string,
    {
      autoConnect: false,
    },
  );

  public updateLobbySettings(settings: Partial<LobbySettings>) {
    this.socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, settings);
  }

  public gameSkipCard(name: string) {
    this.socket.emit(CLIENT_EVENT_NAME.GameSkipCard, name);
  }

  public gameValidAnswer(name: string) {
    this.socket.emit(CLIENT_EVENT_NAME.GameValidAnswer, name);
  }

  public gameForbiddenWordUsed(name: string) {
    this.socket.emit(CLIENT_EVENT_NAME.GameForbiddenWordUsed, name);
  }

  public gameStartNextRound() {
    this.socket.emit(CLIENT_EVENT_NAME.GameStartNextRound);
  }

  public createLobby(username: string, browserLanguage: string) {
    this.socket.emit(CLIENT_EVENT_NAME.CreateLobby, username, browserLanguage);
  }

  public joinLobby(username: string, lobbyId: string) {
    this.socket.emit(CLIENT_EVENT_NAME.JoinLobby, username, lobbyId);
  }

  public tryStartGame() {
    this.socket.emit(CLIENT_EVENT_NAME.TryStartGame);
  }

  public changeTeam() {
    this.socket.emit(CLIENT_EVENT_NAME.ChangeTeam);
  }

  public lobbyKickClient(clientId: string) {
    this.socket.emit(CLIENT_EVENT_NAME.LobbyKickClient, clientId);
  }
}

export const socketService = new SocketService();

if (process.env.NODE_ENV !== 'production') {
  socketService.socket.onAny((eventName, ...args) => {
    console.log(`Event: ${eventName} Args:`, args);
  });
}