import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    emailId: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model<IUser>('User', userSchema);
