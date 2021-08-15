import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
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

  async removeById(item: string);
  async removeById(item: T);
  async removeById(item: string | T) {
    let id = item;
    if (typeof item !== 'string' && item?._id) {
      id = item._id;
    }

    return this.model.deleteOne({ _id: id } as FilterQuery<DocumentType<T>>);
  }

  async remove(filter: FilterQuery<DocumentType<T>>, multi: boolean) {
    if (multi) {
      await this.model.deleteMany(filter);
    } else {
      await this.model.deleteOne(filter);
    }
  }
}
