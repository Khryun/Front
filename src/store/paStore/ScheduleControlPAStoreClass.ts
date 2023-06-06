import { IScheduleControl } from "../../options/model/schedule.model";
import { makeAutoObservable } from "mobx";
import ScheduleServices from "../../services/schedule.service";


class ScheduleControlPAStoreClass {
  scheduleList: IScheduleControl[] = [];
  schedule: IScheduleControl | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  async getScheduleByEmployeeId(employeeId: number) {
    const scheduleList: IScheduleControl[] = await ScheduleServices.getScheduleControlByEmployeeId(employeeId);
    this.setScheduleList(scheduleList);
  }


  setScheduleList(scheduleList: IScheduleControl[]) {
    this.scheduleList = scheduleList;
  }

  setSchedule(schedule: IScheduleControl | undefined) {
    this.schedule = schedule;
  }

  deleteScheduleList() {
    this.setScheduleList([]);
  }

  deleteSchedule() {
    this.setSchedule(undefined);
  }
}


export default ScheduleControlPAStoreClass;