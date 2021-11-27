import { Controller, Get, Param } from 'routing-controllers';
import { lobbyManager } from '@/managers/lobby.manager';

@Controller('/lobby')
export class LobbyController {
  @Get('/is-protected/:id')
  isProtected(@Param('id') id: string) {
    const lobby = lobbyManager.getLobby(id);

    if (!lobby) {
      return false;
    }

    return lobby.password !== undefined;
  }
}
