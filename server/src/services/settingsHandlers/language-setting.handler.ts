import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';

@ForEvent('language')
export class LanguageSettingHandler extends BaseSettingsHandler {
  process(socket: ClientSocket, lobby: Lobby): Promise<boolean> {
    throw new Error('Not defined');
  }
}
