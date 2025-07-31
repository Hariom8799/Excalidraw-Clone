import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: number; // or number, depending on your user ID type
    }
  }
}
