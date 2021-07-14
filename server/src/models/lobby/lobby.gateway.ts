import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8080, {
  transports: ['websocket'],
  handlePreflightRequest: (req: any, res: any) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin, //or the specific origin you want to give access to,
      'Access-Control-Allow-Credentials': true,
    };
    res.writeHead(200, headers);
    res.end();
  },
})
export class LobbyGateway implements OnGatewayInit, OnGatewayConnection {
  private readonly logger = new Logger(LobbyGateway.name);

  constructor(private readonly lobbyService: LobbyService) {
    this.logger.log('Lobby gateway initialized');
  }

  @SubscribeMessage('createLobby')
  create(@MessageBody() createLobbyDto: CreateLobbyDto) {
    this.logger.log('In create lobby event');
    return this.lobbyService.create(createLobbyDto);
  }

  @SubscribeMessage('findAllLobby')
  findAll() {
    return this.lobbyService.findAll();
  }

  @SubscribeMessage('findOneLobby')
  findOne(@MessageBody() id: number) {
    return this.lobbyService.findOne(id);
  }

  @SubscribeMessage('updateLobby')
  update(@MessageBody() updateLobbyDto: UpdateLobbyDto) {
    return this.lobbyService.update(updateLobbyDto.id, updateLobbyDto);
  }

  @SubscribeMessage('removeLobby')
  remove(@MessageBody() id: number) {
    return this.lobbyService.remove(id);
  }

  public afterInit(server: WebSocket): any {
    this.logger.log('Lobby gateway after init');
  }

  public handleConnection(client: any, ...args: any[]): any {
    this.logger.log('Lobby gateway handle connection');
    console.log(client);
    console.log(args);
  }
}
