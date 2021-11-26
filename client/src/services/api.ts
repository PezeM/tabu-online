export class ApiService {
  public readonly url: string = `${process.env.REACT_APP_SERVER_URL}/api`;

  constructor() {
   if (!process.env.REACT_APP_SERVER_URL) {
    const message = 'Environment variable REACT_APP_SERVER_URL not specified';
    console.error(message);
    throw new Error(message);
   }
  }
  
  isLobbyProtected(lobbyId: string) {
   return `${this.url}/lobby/is-protected/${lobbyId}`;
  }
}
