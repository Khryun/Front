import { makeAutoObservable } from "mobx";


class NotificationsPAStoreClass {
  isNotFindChecks: boolean = false;
  isEmptyChecks: boolean = false;

  isNotFindClient: boolean = false;
  isCreateClient: boolean = false;
  isConflictClient: boolean = false;
  isDeleteClient: boolean = false;

  isNotFindEmployee: boolean = false;
  isCreateEmployee: boolean = false;
  isConflictEmployee: boolean = false;
  isDeleteEmployee: boolean = false;

  isNotFindSchedule: boolean = false;
  isCreateSchedule: boolean = false;
  isConflictSchedule: boolean = false;

  isSuccessRegister: boolean = false;
  isConflictRegister: boolean = false;
  isSuccessUnregister: boolean = false;

  isSubmitOrder: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setIsNotFindChecks(boolean: boolean) {
    this.isNotFindChecks = boolean;
  }

  setIsEmptyChecks(boolean: boolean) {
    this.isEmptyChecks = boolean;
  }

  deleteIsNotFindChecks() {
    this.setIsNotFindChecks(false);
  }

  deleteIsEmptyChecks() {
    this.setIsEmptyChecks(false);
  }

  deleteNotificationsChecks() {
    this.deleteIsNotFindChecks();
    this.deleteIsEmptyChecks();
  }


  setIsNotFindClient(boolean: boolean) {
    this.isNotFindClient = boolean;
  }

  setIsCreateClient(boolean: boolean) {
    this.isCreateClient = boolean;
  }

  setIsConflictClient(boolean: boolean) {
    this.isConflictClient = boolean;
  }

  setIsDeleteClient(boolean: boolean) {
    this.isDeleteClient = boolean;
  }

  deleteIsNotFindClient() {
    this.setIsNotFindClient(false);
  }

  deleteIsCreateClient() {
    this.setIsCreateClient(false);
  }

  deleteIsConflictClient() {
    this.setIsConflictClient(false);
  }

  deleteIsDeleteClient() {
    this.setIsDeleteClient(false);
  }

  deleteNotificationsClient() {
    this.deleteIsNotFindClient();
    this.deleteIsCreateClient();
    this.deleteIsConflictClient();
    this.deleteIsDeleteClient();
  }


  setIsNotFindEmployee(boolean: boolean) {
    this.isNotFindEmployee = boolean;
  }

  setIsCreateEmployee(boolean: boolean) {
    this.isCreateEmployee = boolean;
  }

  setIsConflictEmployee(boolean: boolean) {
    this.isConflictEmployee = boolean;
  }

  setIsDeleteEmployee(boolean: boolean) {
    this.isDeleteEmployee = boolean;
  }

  deleteIsNotFindEmployee() {
    this.setIsNotFindEmployee(false);
  }

  deleteIsCreateEmployee() {
    this.setIsCreateEmployee(false);
  }

  deleteIsConflictEmployee() {
    this.setIsConflictEmployee(false);
  }

  deleteIsDeleteEmployee() {
    this.setIsDeleteEmployee(false);
  }

  deleteNotificationsEmployee() {
    this.deleteIsNotFindEmployee();
    this.deleteIsCreateEmployee();
    this.deleteIsConflictEmployee();
    this.deleteIsDeleteEmployee();
  }


  setIsNotFindSchedule(boolean: boolean) {
    this.isNotFindSchedule = boolean
  }

  setIsCreateSchedule(boolean: boolean) {
    this.isCreateSchedule = boolean;
  }

  setIsConflictSchedule(boolean: boolean) {
    this.isConflictSchedule= boolean;
  }

  deleteIsNotFindSchedule() {
    this.setIsNotFindSchedule(false);
  }

  deleteIsCreateSchedule() {
    this.setIsCreateSchedule(false);
  }

  deleteIsConflictSchedule() {
    this.setIsConflictSchedule(false);
  }

  deleteNotificationsSchedule() {
    this.deleteIsNotFindSchedule();
    this.deleteIsCreateSchedule();
    this.deleteIsConflictSchedule();
  }


  setIsSuccessRegister(boolean: boolean) {
    this.isSuccessRegister = boolean;
  }
  setIsSuccessUnregister(boolean: boolean) {
    this.isSuccessUnregister = boolean;
  }

  setIsConflictRegister(boolean: boolean) {
    this.isConflictRegister = boolean;
  }

  deleteIsSuccessRegister() {
    this.setIsSuccessRegister(false);
  }

  deleteIsSuccessUnregister() {
    this.setIsSuccessUnregister(false);
  }

  deleteIsConflictRegister() {
    this.setIsConflictRegister(false);
  }

  deleteNotificationsRegister() {
    this.deleteIsSuccessRegister();
    this.deleteIsSuccessUnregister();
    this.deleteIsConflictRegister();
  }


  setIsSubmitOrder(boolean: boolean) {
    this.isSubmitOrder = boolean;
  }

  deleteIsSubmitOrder() {
    this.setIsSubmitOrder(false);
  }
}


export default NotificationsPAStoreClass;