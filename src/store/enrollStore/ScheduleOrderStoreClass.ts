import { IScheduleSpecialist } from "../../options/model/schedule.model";
import { IOrderBase } from "../../options/model/order.model";
import { makeAutoObservable } from "mobx";
import ScheduleServices from "../../services/schedule.service";


class ScheduleOrderStoreClass {
  ScheduleList: IScheduleSpecialist[] = [];
  ScheduleMonth: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async getScheduleList(orderBase: IOrderBase) {
    const schedules = await ScheduleServices.getScheduleBySpecialistId(orderBase);
    this.deleteScheduleMonth();

    schedules.forEach((schedule: IScheduleSpecialist) => {
      const scheduleMonth: string = new Date(schedule.date).toLocaleString('ru', { month: 'long' });

      if (!this.ScheduleMonth.length) {
        this.addScheduleMonth(scheduleMonth);
      } else {
        this.ScheduleMonth.every((month: string, i: number) => {
          if (scheduleMonth === month) {
            return false;
          }
          if (i === this.ScheduleMonth.length - 1) {
            this.addScheduleMonth(scheduleMonth);
          }

          return true;
        })
      }
    })

    this.setScheduleList(schedules);
  }

  setScheduleList(schedules: IScheduleSpecialist[]) {
    this.ScheduleList = schedules;
  }

  setScheduleMonth(months: string[]) {
    this.ScheduleMonth = months
  }

  addScheduleMonth(month: string) {
    this.ScheduleMonth.push(month);
  }

  deleteScheduleList() {
    this.setScheduleList([]);
  }

  deleteScheduleMonth() {
    this.setScheduleMonth([]);
  }
}


export default ScheduleOrderStoreClass;