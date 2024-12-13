import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import EmployeeController from '../controllers/employee.controller';
import EmployeeValidator from '../validators/employee.validator';
import upload from '../middlewares/upload.middleware';

class EmployeeRoutes {
  private EmployeeController = new EmployeeController();
  private router = express.Router();
  private EmployeeValidator = new EmployeeValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all users
    this.router.get('/all', this.EmployeeController.getAllEmployees);

    //route to create a new user
    this.router.post(
      '',
      upload.single('image'),
      userAuth,
      this.EmployeeValidator.newEmployee,
      this.EmployeeController.newEmployee
    );

    //route to get a single user
    this.router.get('', userAuth, this.EmployeeController.getEmployee);

    //route to update a single user
    this.router.put('/:_id', userAuth, this.EmployeeController.updateEmployee);

    //route to delete a single user
    this.router.delete('/:_id', userAuth, this.EmployeeController.deleteEmployee);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default EmployeeRoutes;
