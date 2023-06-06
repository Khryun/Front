import { IScheduleWorker } from "../../options/model/schedule.model";
import { makeAutoObservable } from "mobx";
import ScheduleServices from "../../services/schedule.service";


class ScheduleWorkerPAStoreClass {
  schedule: IScheduleWorker[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async getSchedule() {
    const schedule = await ScheduleServices.getScheduleWorkerByEmployeeId();
    this.setSchedule(schedule);
  }


  setSchedule(schedule: IScheduleWorker[]) {
    this.schedule = schedule;
  }

  deleteSchedule() {
    this.setSchedule([]);
  }
}


export default ScheduleWorkerPAStoreClass;