import { verify } from "jsonwebtoken";

export function validateToken(token: string, secret: string): boolean {
  try {
    verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}
