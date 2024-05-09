import { Accounts } from './account';

export {};

export interface IUser {
   _id: string;
   fullname: string;
   image: string;
   address: string;
   phone: string;
   account: IAccount;
   role: string;
   createdAt: string;
   updatedAt: string;
}

export interface IAccount {
   _id: string;
   username: string;
   password?: string;
   provider: Accounts;
   providerId?: string;
   createdAt: string;
   updatedAt: string;
}

declare global {
   namespace Express {
      interface User extends IUser {}
   }
}
