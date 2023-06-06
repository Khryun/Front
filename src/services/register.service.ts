import { IRegister } from "../options/model/register.model";
import axios from "axios";


export default class RegisterServices {
  static pathDefault: string = "/account";


  static async register(register: IRegister): Promise<void> {
    await axios.post(`/employees/${register.user_id}${this.pathDefault}`, {
      password: register.password,
    });
  }

  static async unregister(userId: number): Promise<void> {
    await axios.delete(`/employees/${userId}${this.pathDefault}`);
  }
}