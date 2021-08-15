import { BaseRepository } from '@/repositories/base.repository';
import { CardSet } from '@models/card-set.model';
import { LobbyLanguage } from '@shared/enums/lobby';
import { CardSetsCountDto } from '@shared/dto/card-set.dto';

export class CardSetRepository extends BaseRepository<CardSet> {
  constructor() {
    super(CardSet.model);
  }

  async cardSetsForLanguage(language: LobbyLanguage): Promise<CardSetsCountDto[]> {
    return this.model.aggregate<CardSetsCountDto>([
      {
        $match: {
          language: language,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          cardCount: { $size: '$card' },
        },
      },
    ]);
  }
}
