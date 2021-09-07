import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { LobbyLanguage } from '@shared/enums/lobby';

@ForEvent('language')
export class LanguageSettingHandler extends BaseSettingsHandler<'language'> {
  process(socket: ClientSocket, lobby: Lobby, language: LobbyLanguage): Promise<boolean> {
    throw new Error('Not defined');
  }
}
