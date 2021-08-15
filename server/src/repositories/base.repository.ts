import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { CardSet } from '@models/card-set.model';
import { BaseModel } from '@models/base-model.model';
import { FilterQuery } from 'mongoose';

export class BaseRepository<T extends BaseModel> {
  constructor(protected model: ReturnModelType<new (...args) => T>) {}

  async exists(item: T): Promise<boolean> {
    const result = await this.model.findOne({ _id: item._id } as FilterQuery<DocumentType<T>>);

    return !!result === true;
  }

  async create(data: Partial<T>) {
    return this.model.create(data);
  }
}

const test = new BaseRepository(CardSet.model);
