import { CardSetRepository } from '@/repositories/card-set.repository';
import { Lobby } from '@models/lobby.model';
import { LobbyLanguage } from '@shared/enums';

export class CardService {
  private readonly cardSetRepository: CardSetRepository;

  constructor() {
    this.cardSetRepository = new CardSetRepository();
  }

  public async setCardSets(lobby: Lobby, language: LobbyLanguage) {
    lobby.cardSets = await this.cardSetRepository.getCardSetsForLanguage(language);
  }
}
