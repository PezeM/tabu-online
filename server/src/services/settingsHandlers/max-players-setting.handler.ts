import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { CardSetRepository } from '@/repositories/card-set.repository';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { LobbySettingsUpdateException } from '@exceptions/LobbySettingsUpdateException';

@ForEvent('maxPlayers')
export class MaxPlayersSettingHandler extends BaseSettingsHandler<'maxPlayers'> {
  private cardSetRepository: CardSetRepository;

  constructor() {
    super();
    this.cardSetRepository = new CardSetRepository();
  }

  async process(socket: ClientSocket, lobby: Lobby, value: number): Promise<boolean> {
    if (lobby.membersCount > value) {
      throw new LobbySettingsUpdateException('error.morePlayersInGameThanSelected');
    }

    return true;
  }
}
