import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import UserTokenUtil from '../utils/token.util';
import bcrypt from 'bcrypt';

class UserService {

  //create new user
  public newUser = async (body: IUser): Promise<IUser> => {
    const data = await User.create(body);
    return data;
  };

  

  //get a single user
  public getUser = async (name_: string, password: string): Promise<Object> => {
    const data = await User.findOne({name: name_});
    if(data === null){
        return data;
    }else {
        const userCheck = await bcrypt.compare(password, data.password);            
        if(userCheck){
            const token = await UserTokenUtil.generateToken({name: data.name, id: data._id}, process.env.SECRET_KEY, "24h");
            const {name} = data;
            return {name, token}; 
        }else{
            return userCheck;
        }
    }
  };
}

export default UserService;
