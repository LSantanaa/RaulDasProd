import mongoose from 'mongoose';

export interface Token {
  user: string;
  longToken: string;
  createdAt: Date;
  expiresAt: Date;
}

const tokenSchema = new mongoose.Schema<Token>({
  user: String,
  longToken: String,
  createdAt: Date,
  expiresAt: Date
});

export const TokenModel = mongoose.model<Token>('Token', tokenSchema);
