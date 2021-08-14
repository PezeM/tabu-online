import { BaseModel } from '@models/base-model.model';
import { prop } from '@typegoose/typegoose';

export class Card extends BaseModel {
  @prop({ required: true, index: true })
  public name!: string;

  @prop({ required: true, type: () => [String] })
  public forbiddenWords!: string[];
}
