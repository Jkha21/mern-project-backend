import { Document } from 'mongoose';

export interface IEmployee extends Document {
  _id: string | number;
  name: string;
  emailId: string;
  designation: string;
  mobNo: string;
  gender: string;
  course: string;
  userId: string;
  image?: Object
}
