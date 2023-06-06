

export interface IReportServices {
  service_id: number,
  name_service: string,
  profit: number,
  amount_checks: number,
}


export interface IReportSpecialists {
  employee_id: number,
  full_name: string,
  profit: number,
  period_grade: number,
  amount_checks: number,
}


export interface IReportEstablishments {
  establishment_id: number,
  address_establishment: string,
  profit: number,
  amount_checks: number,
}

export interface IReportDownload {
  start_date: string,
  end_date: string,
}