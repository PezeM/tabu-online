import { ClientSocket } from '@interfaces/socket.interface';
import { generateRandomId } from '@shared/utils/uuid';
import { ClientPayload } from '@shared/interfaces/clientPayload';
import { ClientCP } from '@shared/dto/client.dto';
import { clientManager } from '@/managers/client.manager';
import { Team } from '@shared/enums/client';

export class Client implements ClientPayload<ClientCP> {
  public readonly id: string;
  public team: Team;

  constructor(private _socket: ClientSocket, public readonly username: string) {
    this.id = generateRandomId();
    this.team = Team.Blue;

    clientManager.addClient(this);
  }

  get socket() {
    return this._socket;
  }

  get socketId() {
    return this._socket.id;
  }

  public getCP(): ClientCP {
    return {
      id: this.id,
      username: this.username,
      team: this.team,
    };
  }
}
