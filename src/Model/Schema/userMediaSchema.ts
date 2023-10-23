import mongoose from "mongoose";

export interface userMedia{
  username: string,
  data:[
    {
      id: number,
      caption: string,
      media_url: string,
      media_type: string,
      thumbnail_url: string,
      is_shared_to_feed: boolean
    }
  ]
}

const userSchema = new mongoose.Schema<userMedia>({
  username: String,
  data:[
    {
      id: Number,
      caption: String,
      media_url: String,
      media_type: String,
      thumbnail_url: String,
      is_shared_to_feed: Boolean
    }
  ]
});

export const userMedia = mongoose.model<userMedia>('userMedia', userSchema);
