import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';

@ForEvent('pointsToWin')
export class PointsToWinSettingHandler extends BaseSettingsHandler<'pointsToWin'> {
  constructor() {
    super();
  }

  async process(): Promise<boolean> {
    return true;
  }
}
