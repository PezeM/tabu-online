import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { BaseModel } from '@models/base-model.model';
import { LobbyLanguage } from '@shared/enums/lobby';
import { Card } from '@models/card.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    collection: 'card-sets',
    timestamps: false,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
})
export class CardSet extends BaseModel {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({
    required: true,
    enum: LobbyLanguage,
    default: LobbyLanguage.EN,
    type: String,
    index: true,
  })
  public language!: LobbyLanguage;

  @prop({ required: true, type: () => [Card], _id: false })
  public cards!: Card[];

  @prop({ required: false, type: () => [String], _id: false })
  public tags?: string[];

  static get model(): ModelType<CardSet> {
    return getModelForClass(CardSet);
  }
}
