import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';

@ForEvent('roundTime')
export class RoundTimeSettingHandler extends BaseSettingsHandler<'roundTime'> {
  constructor() {
    super();
  }

  async process(): Promise<boolean> {
    return true;
  }
}
