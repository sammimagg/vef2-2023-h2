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