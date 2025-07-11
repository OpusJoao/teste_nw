import { UserPayload } from '../../auth/auth/interfaces/user-payload.interface.js';

declare module 'express' {
  export interface Request {
    user: UserPayload;
  }
}
