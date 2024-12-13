/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

class UserController {
  public UserService = new UserService();


    /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
    public newUser = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const data = await this.UserService.newUser(req.body);
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
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getUser(req.body.name, req.body.password);
      if(data === null){
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          data: data,
          message: 'User Not Found'
        });
      }else if(data === false){
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: data,
          message: 'Password mismatched'
        });
      }else{
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'User fetched successfully'
        });
      }
    } catch (error) {
      next(error);
    }
  };


}

export default UserController;
