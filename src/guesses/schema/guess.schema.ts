import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GuessDocument = Guess & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }
  }
})
export class Guess {
  @Prop({ required: true })
  guess: string;

  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  ownerUserId: string;

  @Prop({ required: true })
  correctChars: number;

  @Prop({ required: true })
  misplacedChars: number;
}

export const GuessSchema = SchemaFactory.createForClass(Guess);
