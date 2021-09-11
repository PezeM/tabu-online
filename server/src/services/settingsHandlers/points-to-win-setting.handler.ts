import { ForEvent } from '@services/settingsHandlers/for-setting.decorator';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { CardSetRepository } from '@/repositories/card-set.repository';

@ForEvent('pointsToWin')
export class PointsToWinSettingHandler extends BaseSettingsHandler<'pointsToWin'> {
  private cardSetRepository: CardSetRepository;

  constructor() {
    super();
    this.cardSetRepository = new CardSetRepository();
  }

  async process(): Promise<boolean> {
    return true;
  }
}
