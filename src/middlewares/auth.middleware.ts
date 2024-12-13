/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserTokenUtil from '../utils/token.util';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    // const { user }: any = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    const user: any = await UserTokenUtil.verifyToken(bearerToken, process.env.SECRET_KEY);
    // req.body.userId = user.id;
    // const formData = new FormData;
    // formData.append("userId",  user.id);
    // req.body["userId"] = formData;
    // req.body.userId = user.id;
    // const formDataObject: any = {};
    // for (let [key, value] of Object.entries(req.body)) {
    //   formDataObject[key] = value;
    // }
    // formDataObject.append("userId", user.id);
    // Now add the userId to the object
    // formDataObject = user.id;

    // Update req.body with the modified form data
    // req.body = formDataObject;
    const data = {};
    for (let [key, value] of Object.entries(req.body)) {
      data[key] = value;
    }
    data["userId"] =  user.id;
    // req.body.append("userId", user.id);
    // console.log(data); 
    req.body = data;
    console.log(req.body);

    // Log the modified request body (for debugging purposes)
    next();
  } catch (error) {
    next(error);
  }
};
