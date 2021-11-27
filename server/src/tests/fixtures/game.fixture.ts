import { Game } from '@models/game.model';
import { Card } from '@models/card.model';
import { LobbyFixture } from '@/tests/fixtures/lobby.fixture';
import { ClientFixture } from '@/tests/fixtures/client.fixture';
import { Team } from '@shared/enums';

export class GameFixture {
  static create(cards: Card[], lobby = LobbyFixture.create(ClientFixture.create(Team.Blue))): Game {
    return new Game(cards, lobby);
  }
}
