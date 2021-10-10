import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';

@ForEvent('maximumNumberOfSkips')
export class MaxSkipsSettingHandler extends BaseSettingsHandler<'maximumNumberOfSkips'> {
  constructor() {
    super();
  }

  async process(): Promise<boolean> {
    return true;
  }
}
