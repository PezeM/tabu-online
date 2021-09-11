import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { LobbyLanguage } from '@shared/enums/lobby';
import { LobbySettingsUpdateException } from '@exceptions/LobbySettingsUpdateException';
import { isLobbyLanguage } from '@utils/type-guards';
import { CardSetRepository } from '@/repositories/card-set.repository';
import { SERVER_EVENT_NAME } from '@shared/constants/events';

@ForEvent('language')
export class LanguageSettingHandler extends BaseSettingsHandler<'language'> {
  private cardSetRepository: CardSetRepository;

  constructor() {
    super();
    this.cardSetRepository = new CardSetRepository();
  }

  async process(socket: ClientSocket, lobby: Lobby, language: LobbyLanguage): Promise<boolean> {
    if (!isLobbyLanguage(language)) {
      throw new LobbySettingsUpdateException('error.languageNotSupported');
    }

    lobby.settings.cardIds = undefined;

    const cardSets = await this.cardSetRepository.getCardSetsForLanguage(language);
    socket.emit(SERVER_EVENT_NAME.UpdateCardSets, cardSets);

    return true;
  }
}
