import { Request, Response } from "express";


export const authInsta = ( req: Request, res: Response)=>{

  res.redirect(`https://api.instagram.com/oauth/authorize
  ?client_id=625643059766168
  &redirect_uri=https://raul-das-prod.vercel.app/auth/
  &scope=user_profile,user_media
  &response_type=code`)


}