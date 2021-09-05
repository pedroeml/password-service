import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }
  }
})
export class Game {
  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  ownerUserId: string;

  @Prop()
  winnerUserId: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
