import { type } from "os";

export type User = {
    id: number;
    username: string;
    isAdmin: boolean;
    access_token: string;
    token_type: string;
    expires_in: number;
  }
export type ErrorMessage = {
  message: string;
}
export type DecodedToken = {
  id: number;
  username: string;
  admin: boolean;
  iat: number;
  exp: number;
}
export type Event = {
  id: number;
  name: string;
  slug: string;
  location: string;
  url: string;
  description: string;
  created: Date;
  updated: Date;
}
export type SetProfilePictureResponse = {
  id: number;
  accessToken: string;
  profile_picture: string;
}
export type Registration = {
  id: number,
  name: string,
  username: string,
  profile_picture: string | null,
  comment: string | null
}
