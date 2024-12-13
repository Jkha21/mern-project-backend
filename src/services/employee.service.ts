import Employee from '../models/employee.model';
import { IEmployee } from '../interfaces/employee.interface';

class EmployeeService {

  //get all users
  public getAllEmployees = async (): Promise<Object[]> => {
    const data = await Employee.find();
    return data;
  };

  //create new user
  public newEmployee = async (body: IEmployee): Promise<Object> => {
    const data = await Employee.create(body);
    return data;
  };

  //update a user
  public updateEmployee = async (_id: string, body: IEmployee): Promise<Object> => {
    const data = await Employee.findByIdAndUpdate(
      {
        _id
      },
      body
    );
    return data;
  };

  //delete a user
  public deleteEmployee = async (_id: string): Promise<string> => {
    await Employee.findByIdAndDelete(_id);
    return '';
  };

  //get a single user
  public getEmployee = async (_id: string): Promise<Object> => {
    const data = await Employee.find({userId: _id});
    return data;
  };
}

export default EmployeeService;
