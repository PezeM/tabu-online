import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { CardSetRepository } from '@/repositories/card-set.repository';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { LobbySettingsUpdateException } from '@exceptions/LobbySettingsUpdateException';

@ForEvent('cardIds')
export class CardIdsSettingsHandler extends BaseSettingsHandler<'cardIds'> {
  private cardSetRepository: CardSetRepository;

  constructor() {
    super();
    this.cardSetRepository = new CardSetRepository();
  }

  async process(socket: ClientSocket, lobby: Lobby, value: string[]): Promise<boolean> {
    if (!this.validateCardIds(lobby, value)) {
      throw new LobbySettingsUpdateException('error.wrongCardIds');
    }

    return true;
  }

  private validateCardIds(lobby: Lobby, newCardIds: string[]): boolean {
    const cardSets = lobby.cardSets;

    for (const newCardId of newCardIds) {
      if (!cardSets.some(c => c._id === newCardId)) {
        return false;
      }
    }

    return true;
  }
}
