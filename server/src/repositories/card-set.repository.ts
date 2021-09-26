import { BaseRepository } from '@/repositories/base.repository';
import { CardSet } from '@models/card-set.model';
import { LobbyLanguage } from '@shared/enums/lobby';
import { CardSetsCountDto } from '@shared/dto/card-set.dto';
import mongoose from 'mongoose';
import { CardSetIdCardDto } from '@dtos/card-set-id-card.dto';
import { Card } from '@models/card.model';

export class CardSetRepository extends BaseRepository<CardSet> {
  constructor() {
    super(CardSet.model);
  }

  async getCardSetsForLanguage(language: LobbyLanguage): Promise<CardSetsCountDto[]> {
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
          tags: 1,
          cardsCount: { $size: '$cards' },
        },
      },
    ]);
  }

  public async getCardsWithIds(cardIds: string[]): Promise<Card[]> {
    const cardSets = (await this.model
      .find({ _id: { $in: cardIds.map(id => new mongoose.Types.ObjectId(id)) } }, { cards: 1 })
      .lean()) as unknown as CardSetIdCardDto[];

    return cardSets.reduce((previousValue: Card[], currentValue) => {
      return previousValue.concat(currentValue.cards);
    }, []);
  }
}
