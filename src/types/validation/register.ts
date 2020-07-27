import { IUser } from '@model';

/* -------------------------------------------------------------------------- */

export interface IRegisterData {
  firstName: IUser['firstName'];
  lastName?: IUser['lastName'];
  username: IUser['username'];
  email: IUser['email'];
  password: IUser['password'];
  confirmPassword: IUser['password'];
}

export interface IRegisterError {
  firstName?: IUser['firstName'];
  username?: IUser['username'];
  lastName?: IUser['lastName'];
  email?: IUser['email'];
  password?: IUser['password'];
  confirmPassword?: IUser['password'];
}
