import { IUser } from '@model';

/* -------------------------------------------------------------------------- */

export interface ILoginData {
  usernameOrEmail: IUser['username'] | IUser['email'];
  password: IUser['password'];
}

export interface ILoginError {
  usernameOrEmail: IUser['username'] | IUser['email'];
  password?: IUser['password'];
}
