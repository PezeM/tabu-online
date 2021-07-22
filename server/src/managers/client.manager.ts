import { Client } from '@models/client.model';
import { isEmpty } from '@utils/util';

class ClientManager {
  private readonly _clients: Map<string, Client>;

  constructor() {
    this._clients = new Map();
  }

  public addClient(client: Client): Client {
    if (isEmpty(client)) throw new Error('Client object is empty');

    this._clients.set(client.socket.id, client);

    return client;
  }

  public removeClient(client: Client): boolean {
    return this._clients.delete(client.socket.id);
  }

  public removeClientById(id: string): boolean {
    for (const client of this._clients.values()) {
      if (client.id === id) {
        return this._clients.delete(client.socket.id);
      }
    }

    return false;
  }

  public getClient(socketId: string): Client | undefined {
    return this._clients.get(socketId);
  }

  public getClientById(id: string): Client | undefined {
    for (const client of this._clients.values()) {
      if (client.id === id) {
        return client;
      }
    }
  }
}

export const clientManager = new ClientManager();
