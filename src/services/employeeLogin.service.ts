import { IEmployeeLogin, IEmployeeLoginUpdate } from "../options/model/employeeLogin.model";
import axios from "axios";


export default class EmployeeLoginServices {
  static pathDefault: string = "/employees";


  static async getAll(): Promise<IEmployeeLogin[]> {
    const employees = await axios.get(`${this.pathDefault}/account`);

    return employees.data;
  }

  static async getEmployeeLoginByTelephone(telephone: string): Promise<IEmployeeLogin> {
    const employee = await axios.get(`${this.pathDefault}/account`, {
      params: {
        telephone: telephone,
      }
    });

    return employee.data;
  }

  static async getEmployeeLogin(employeeId: number): Promise<IEmployeeLogin> {
    const employees = await axios.get(`${this.pathDefault}/${employeeId}/account`);

    return employees.data;
  }

  static async createEmployeeLogin(employeeId: number, employee: IEmployeeLoginUpdate): Promise<void> {
    await axios.post(`${this.pathDefault}/${employeeId}/account`, {
        password: employee.password,
    });
  }

  static async updateEmployeeLogin(employeeId: number, employee: IEmployeeLoginUpdate): Promise<void> {
    await axios.patch(`${this.pathDefault}/${employeeId}/account`, {
        password: employee.password,
    });
  }

  static async deleteEmployeeLogin(employeeId: number): Promise<void> {
    await axios.delete(`${this.pathDefault}/${employeeId}/account`);
  }
}