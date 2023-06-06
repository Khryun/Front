import { IEmployee } from "../../options/model/employee.model";
import { makeAutoObservable } from "mobx";
import { IEmployeeLogin } from "../../options/model/employeeLogin.model";


class EmployeePAStoreClass {
  employee: IEmployee | undefined;
  employees: IEmployee[] = [];
  employeeLogin: IEmployeeLogin | undefined = undefined;
  employeesLogin: IEmployeeLogin[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setEmployees(employees: IEmployee[]) {
    this.employees = employees;
  }

  setEmployee(employee: IEmployee | undefined) {
    this.employee = employee;
  }

  setEmployeeLogin(employee: IEmployeeLogin | undefined) {
    this.employeeLogin = employee;
  }

  setEmployeesLogin(employees: IEmployeeLogin[]) {
    this.employeesLogin = employees;
  }


  deleteEmployees() {
    this.setEmployees([]);
  }

  deleteEmployee() {
    this.setEmployee(undefined);
  }

  deleteEmployeeLogin() {
    this.setEmployeeLogin(undefined);
  }

  deleteEmployeesLogin() {
    this.setEmployeesLogin([]);
  }
}


export default EmployeePAStoreClass;