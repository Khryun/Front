import { IUser } from "../options/model/user.model";
import axios from "axios";


export default class LoginServices {
  static pathDefault: string = "/login";


  static async login(username: string, password: string): Promise<IUser> {
    const user = await axios.post(this.pathDefault,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    );

    return user.data;
  }
}