

export interface IOrderBase {
  employee_id: number, 
  establishment_id: number,
  services_id: number[], 
}

export interface IOrder extends IOrderBase {
  client_id: number,
  date: string, 
  time: string,
}
