import { Schema, model } from 'mongoose';
import { IEmployee } from '../interfaces/employee.interface';

const employeeSchema = new Schema(
  {
    name: {
      type: String
    },
    emailId: {
      type: String
    },
    designation: {
      type: String
    },
    mobNo: {
      type: String
    },
    gender: {
      type: String
    },
    course: {
      type: String
    },
    userId: {
      type: String
    },
    image: {
      type: Object,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default model<IEmployee>('Employee', employeeSchema);
