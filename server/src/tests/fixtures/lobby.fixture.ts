import { Lobby } from '@models/lobby.model';
import { Client } from '@models/client.model';
import { LobbySettings } from '@shared/interfaces';
import { CardSetsCountDto } from '@shared/dto';
import { LobbySettingsService } from '@services/lobby-settings.service';
import { LobbyLanguage } from '@shared/enums';
import { CardSetsCountDtoFixture } from '@/tests/fixtures/card-sets.fixture';

export class LobbyFixture {
  static create(
    owner: Client,
    settings: LobbySettings = new LobbySettingsService().createDefaultSettings(LobbyLanguage.EN),
    cardSets: CardSetsCountDto[] = CardSetsCountDtoFixture.create(),
    password?,
  ): Lobby {
    return new Lobby(owner, settings, cardSets, password);
  }
}
