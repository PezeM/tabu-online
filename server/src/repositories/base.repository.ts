import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { BaseModel } from '@models/base-model.model';
import { FilterQuery } from 'mongoose';
import { MongoError } from 'mongodb';
import { InternalServerErrorException } from '@exceptions/internal-server.exception';

export class BaseRepository<T extends BaseModel> {
  constructor(protected model: ReturnModelType<new (...args) => T>) {}

  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  async exists(filter: FilterQuery<DocumentType<T>> = {}): Promise<boolean> {
    try {
      return await this.model.exists(filter);
    } catch (e) {
      BaseRepository.throwMongoError(e);
    }
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

  count(filter: FilterQuery<DocumentType<T>> = {}) {
    return this.model.count(filter);
  }

  async countAsync(filter: FilterQuery<DocumentType<T>> = {}): Promise<number> {
    try {
      return await this.count(filter);
    } catch (e) {
      BaseRepository.throwMongoError(e);
    }
  }

  async remove(filter: FilterQuery<DocumentType<T>>, multi: boolean) {
    if (multi) {
      await this.model.deleteMany(filter);
    } else {
      await this.model.deleteOne(filter);
    }
  }
}
