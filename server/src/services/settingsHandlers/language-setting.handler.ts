import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { LobbyLanguage } from '@shared/enums/lobby';
import { LobbySettingsUpdateException } from '@exceptions/LobbySettingsUpdateException';
import { isLobbyLanguage } from '@utils/type-guards';
import { CardService } from '@services/card.service';

@ForEvent('language')
export class LanguageSettingHandler extends BaseSettingsHandler<'language'> {
  private readonly cardService: CardService;

  constructor() {
    super();
    this.cardService = new CardService();
  }

  async process(socket: ClientSocket, lobby: Lobby, language: LobbyLanguage): Promise<boolean> {
    if (!isLobbyLanguage(language)) {
      throw new LobbySettingsUpdateException('error.languageNotSupported');
    }

    lobby.settings.cardIds = undefined;
    await this.cardService.setCardSets(lobby, language);

    return true;
  }
}
