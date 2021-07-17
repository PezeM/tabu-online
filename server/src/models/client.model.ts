import { ClientSocket } from '@interfaces/socket.interface';
import { generateRandomId } from '../../../shared/utils/uuid';

export class Client {
  public readonly id: string;

  constructor(private _socket: ClientSocket, public readonly username: string) {
    this.id = generateRandomId();
  }

  get socket() {
    return this._socket;
  }

  get socketId() {
    return this._socket.id;
  }
}
