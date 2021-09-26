import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
})
export abstract class BaseModel {
  @prop()
  public _id: mongoose.Types.ObjectId;
}
