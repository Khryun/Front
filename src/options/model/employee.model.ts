

export interface IEmployeeBase {
  full_name: string,
  telephone: string,
  email: string | undefined,
  experience: number,
  salary: number,
  brief_info: string | undefined,
  age: number,
  post: string,
}

export interface IEmployee extends IEmployeeBase {
  employee_id: number,
  rating: number,
  services_id: number[],
}

export interface IEmployeeCreate extends IEmployeeBase {
  employee_id: number,
  services_id: number[],
}

export interface IEmployeeUpdate extends IEmployeeBase {
  services_id: number[] | undefined,
}