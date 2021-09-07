import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { LobbyLanguage } from '@shared/enums/lobby';
import { LobbySettingsUpdateException } from '@exceptions/LobbySettingsUpdateException';
import { isLobbyLanguage } from '@utils/type-guards';
import { CardSetRepository } from '@/repositories/card-set.repository';

@ForEvent('language')
export class LanguageSettingHandler extends BaseSettingsHandler<'language'> {
  private cardSetRepository: CardSetRepository;

  constructor() {
    super();
    this.cardSetRepository = new CardSetRepository();
  }

  async process(socket: ClientSocket, lobby: Lobby, language: LobbyLanguage): Promise<boolean> {
    if (!isLobbyLanguage(language)) {
      throw new LobbySettingsUpdateException('Wrong language');
    }

    // Remove all selected cards
    // Probably emit the cardSets only to socket because it can be large payload
    // and not everyone should have it?
    const cardSets = await this.cardSetRepository.cardSetsForLanguage(language);
    console.log('cardSets', cardSets);

    return true;
  }
}
