import { IOrder } from "../../options/model/order.model";
import { IService } from "../../options/model/service.model";
import { IScheduleSpecialist } from "../../options/model/schedule.model";
import { ISpecialist } from "../../options/model/specialist.model";
import { IClientBase } from "../../options/model/client.model";
import { IEstablishmentBase } from "../../options/model/establishment.model";
import { makeAutoObservable } from "mobx";


class OrderDetailsStoreClass {
  OrderDetailsClient: IClientBase | undefined = undefined;
  OrderDetailsEstablishment: IEstablishmentBase | undefined = undefined;
  OrderDetailsSpecialist: ISpecialist | undefined = undefined;
  OrderDetailsServices: IService[] = [];
  OrderDetailsDate: string | undefined = undefined;
  OrderDetailsTime: string | undefined = undefined;
  OrderDetailsDateWithTimes: IScheduleSpecialist | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  addOrderDetailsService(service: IService) {
    this.OrderDetailsServices.push(service);
  }

  setOrderDetailsEstablishment(establishments: IEstablishmentBase | undefined) {
    this.OrderDetailsEstablishment = establishments;
  }

  setOrderDetailsClient(client: IClientBase | undefined) {
    this.OrderDetailsClient = client;
  }

  setOrderDetailsSpecialist(specialist: ISpecialist | undefined) {
    this.OrderDetailsSpecialist = specialist;
  }

  setOrderDetailsServices(services: IService[]) {
    this.OrderDetailsServices = services;
  }

  setOrderDetailsDate(date: string | undefined) {
    this.OrderDetailsDate = date;
  }

  setOrderDetailsTime(time: string | undefined) {
    this.OrderDetailsTime = time;
  }

  setOrderDetailsDateWithTimes(schedule: IScheduleSpecialist | undefined) {
    this.OrderDetailsDateWithTimes = schedule;
  }


  deleteOrderDetailsService(serviceId: number) {
    this.OrderDetailsServices.every(el => {
      if (el.service_id === serviceId) {
        const findIndex = this.OrderDetailsServices.indexOf(el)
        this.OrderDetailsServices.splice(findIndex, 1);
        return false;
      }

      return true;
    })
  }

  deleteOrderDetailsServices() {
    this.setOrderDetailsServices([]);
  }

  deleteOrderDetailsClient() {
    this.setOrderDetailsClient(undefined);
  }

  deleteOrderDetailsEstablishment() {
    this.setOrderDetailsEstablishment(undefined);
  }

  deleteOrderDetailsSpecialist() {
    this.setOrderDetailsSpecialist(undefined);
  }

  deleteOrderDetailsDate() {
    this.setOrderDetailsDate(undefined);
  }

  deleteOrderDetailsTime() {
    this.setOrderDetailsTime(undefined);
  }

  deleteOrderDetailsDateWithTimes() {
    this.setOrderDetailsDateWithTimes(undefined);
  }


  clearStore() {
    this.deleteOrderDetailsClient();
    this.deleteOrderDetailsEstablishment();
    this.deleteOrderDetailsSpecialist();
    this.deleteOrderDetailsServices()
    this.deleteOrderDetailsDate();
    this.deleteOrderDetailsTime();
    this.deleteOrderDetailsDateWithTimes();
  }

  getOrderDetailServicesId(): number[] {
    const servicesId: number[] = [];
    this.OrderDetailsServices.forEach((service: IService) => {
      servicesId.push(service.service_id);
    })
    return servicesId;
  }

  getOrderDetails(): IOrder {
    return {
      client_id: this.OrderDetailsClient!.client_id,
      employee_id: this.OrderDetailsSpecialist!.employee_id,
      services_id: this.getOrderDetailServicesId(),
      establishment_id: this.OrderDetailsEstablishment!.establishment_id,
      date: this.OrderDetailsDateWithTimes!.date,
      time: this.OrderDetailsTime!
    }
  }


  get getOrderDetailsTotalCount() {
    let totalCount: number = 0;
    this.OrderDetailsServices.forEach((service: IService) => {
      totalCount += service.cost
    })
    return totalCount;
  }

  get getOrderDetailsTotalTime() {
    const totalTime: Date = new Date(`${this.OrderDetailsDateWithTimes!.date} ${this.OrderDetailsTime}:00`);
    this.OrderDetailsServices.forEach((service: IService) => {
      totalTime.setMinutes(totalTime.getMinutes() + Number(service.duration));
    })
    return totalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
}


export default OrderDetailsStoreClass;