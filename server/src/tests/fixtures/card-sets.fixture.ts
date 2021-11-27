import { CardSetsCountDto } from '@shared/dto';
import * as faker from 'faker';

export class CardSetsCountDtoFixture {
  static create(cardSets?: CardSetsCountDto[]) {
    const createdCardSets: CardSetsCountDto[] = [
      {
        _id: faker.datatype.string(16),
        name: 'Basic',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'Classic',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'Naxxramas',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'Goblins vs Gnomes',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'Blackrock Mountain',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'The Grand Tournament',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'Whispers of the Old Gods',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'One Night in Karazhan',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'Mean Streets of Gadgetzan',
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: "Journey to Un'Goro",
        cardsCount: faker.datatype.number(100),
      },
      {
        _id: faker.datatype.string(16),
        name: 'Knights of the Frozen Throne',
        cardsCount: faker.datatype.number(100),
      },
    ];

    return { ...cardSets, createdCardSets };
  }
}
