import { IOrder } from "../options/model/order.model";
import { ICheck, ICheckFind } from "../options/model/check.model";
import { IServiceWithStartAndEndTime } from "../options/model/service.model";
import axios from "axios";


export default class CheckServices {
  static pathDefault: string = "/checks";


  static async getAll(): Promise<ICheck[]> {
    const checks = await axios.get(this.pathDefault);

    return checks.data;
  }

  static async getChecksByClientId(clientId: number, check?: ICheckFind): Promise<ICheck[]> {
    const checks = await axios.get(`${this.pathDefault}/clients/${clientId}`, {
      params: {
        paid: check?.paid,
        check_date: check?.date,
      }
    });

    return checks.data;
  }

  static async createCheck(order: IOrder): Promise<void> {
    await axios.post(this.pathDefault, order);
  }

  static async deleteCheck(checkId: number): Promise<void> {
    await axios.delete(`${this.pathDefault}/${checkId}`);
  }

  static async getCheckDetails(checkId: number): Promise<IServiceWithStartAndEndTime[]> {
    const details = await axios.get(`${this.pathDefault}/${checkId}`);

    return details.data;
  }

  static async updateCheckGrade(grade: number, paidBonus: number, checkId: number): Promise<IServiceWithStartAndEndTime[]> {
    const details = await axios.patch(`${this.pathDefault}/${checkId}`, {
      grade: grade,
      paid_bonus: paidBonus,
    });

    return details.data;
  }

}