import express, { IRouter } from 'express';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';
import HashingPassword from '../utils/hash.util';

class UserRoutes {
  private UserController = new UserController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private HashingPassword = new HashingPassword();

  constructor() {
    this.routes();
  }

  private routes = () => {

    //route to create a new user
    this.router.post(
      '',
      this.UserValidator.newUser,
      this.HashingPassword.EncryptPassword(),
      this.UserController.newUser
    );

    //route to get a single user
    this.router.post('/login', this.UserController.getUser);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
