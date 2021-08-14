import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { BaseModel } from '@models/base-model.model';
import { LobbyLanguage } from '@shared/enums/lobby';
import { Card } from '@models/card.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    collection: 'cardSets',
    timestamps: true,
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

  @prop({ required: true, type: () => Card })
  public cards!: Card[];

  @prop()
  createdAt: Date; // provided by schemaOptions.timestamps
  @prop()
  updatedAt: Date; // provided by schemaOptions.timestamps

  static get model(): ModelType<CardSet> {
    return getModelForClass(CardSet);
  }
}

export const CardSetModel = getModelForClass(CardSet);
