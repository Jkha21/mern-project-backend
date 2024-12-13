/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import EmployeeService from '../services/employee.service';

class EmployeeController {
  public EmployeeService = new EmployeeService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.EmployeeService.getAllEmployees();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All Employees fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.EmployeeService.getEmployee(req.body.userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public newEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      // console.log(req.body);
      const employeeData = req.body;
      if (req.file) {
        // Assuming your server is running on localhost:5000
        const imageBaseUrl = 'http://localhost:4000/uploads/'; // Replace with your actual server URL if different
        employeeData.image = { path: `${imageBaseUrl}${req.file.filename}` };
      }
      const data = await this.EmployeeService.newEmployee(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.EmployeeService.updateEmployee(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.EmployeeService.deleteEmployee(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeController;
