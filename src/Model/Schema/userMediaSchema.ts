import mongoose, { Schema, Document } from 'mongoose';

export interface IDataUserMedia extends Document {
    id: number;
    caption: string;
    media_url: string;
    media_type: string;
    thumbnail_url: string;
    permalink: string;
    timestamp: Date;
}

export interface IUserMedia extends Document {
  username: string;
  data: IDataUserMedia[];
}

const DataUserMediaSchema: Schema = new Schema({
  id: { type: Number, required: true },
  caption: { type: String, required: true },
  media_url: { type: String, required: true },
  media_type: { type: String, required: true },
  thumbnail_url: { type: String },
  permalink: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

const UserMediaSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  data:[DataUserMediaSchema]
});

export const UserMedia = mongoose.model<IUserMedia>('UserMedia', UserMediaSchema);
