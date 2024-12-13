import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class EmployeeValidator {
  public newEmployee = (req: Request, res: Response, next: NextFunction): void => {
    // console.log(req.body);
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
      emailId: Joi.string().email().required(),
      designation: Joi.string().required(),
      gender: Joi.string().required(),
      course: Joi.string().required(),
      mobNo: Joi.string().required(),
      userId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

export default EmployeeValidator;
