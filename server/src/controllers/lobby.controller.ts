import { Controller, Get, Param } from 'routing-controllers';
import { lobbyManager } from '@/managers/lobby.manager';

@Controller()
export class LobbyController {
  @Get('/lobby/is-protected/:id')
  isProtected(@Param('id') id: string) {
    const lobby = lobbyManager.getLobby(id);

    if (!lobby) {
      return false;
    }

    return lobby.password !== undefined;
  }
}
