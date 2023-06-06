import { IOrderBase } from "../options/model/order.model";
import { IScheduleControl, IScheduleControlCreate, IScheduleControlFind, IScheduleControlUpdate, IScheduleSpecialist, IScheduleWorker }
  from "../options/model/schedule.model";
import axios from "axios";


export default class ScheduleServices {
  static pathDefault: string = "/schedules";


  static async getScheduleWorkerByEmployeeId(): Promise<IScheduleWorker[]> {
    const schedule = await axios.get(`/employees/me${this.pathDefault}`);

    return schedule.data;
  }

  static async getScheduleControlByEmployeeId(employeeId: number): Promise<IScheduleControl[]> {
    const schedule = await axios.get(`/employees/${employeeId}${this.pathDefault}`);

    return schedule.data;
  }

  static async getScheduleControlByData(data: IScheduleControlFind): Promise<IScheduleControl[]> {
    const schedule = await axios.get(`/employees${this.pathDefault}`, {
      params: {
        presence: data.presence,
        telephone: data.telephone,
        date_work: data.date_work,
      }
    });

    return schedule.data;
  }

  static async getScheduleBySpecialistId(orderBase: IOrderBase): Promise<IScheduleSpecialist[]> {
    const schedule = await axios.post(`/specialists/${orderBase.employee_id}/period`, {
      establishment_id: orderBase.establishment_id,
      services_id: orderBase.services_id
    });

    return schedule.data;
  }

  static async createSchedule(scheduleAdd: IScheduleControlCreate): Promise<void> {
    console.log(scheduleAdd);
    await axios.post(`${this.pathDefault}`, scheduleAdd);
  }

  static async updateSchedule(scheduleId: number, scheduleUpdate: IScheduleControlUpdate): Promise<void> {
    await axios.patch(`${this.pathDefault}/${scheduleId}`, scheduleUpdate);
  }

  static async deleteSchedule(scheduleId: number): Promise<void> {
    await axios.delete(`${this.pathDefault}/${scheduleId}`);
  }
}