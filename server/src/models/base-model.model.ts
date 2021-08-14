import { modelOptions, prop, Severity } from '@typegoose/typegoose';

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
  public _id: string; // change the type of _id to string
}
