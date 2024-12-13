import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  emailId: string;
  password: string;
}
