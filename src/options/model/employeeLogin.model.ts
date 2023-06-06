

export interface IEmployeeLogin {
  employee_id: number,
  full_name: string,
  telephone: string,
  post: string,
  login: string | undefined,
  password: undefined,
}

export interface IEmployeeLoginUpdate {
  password: string | undefined,
}