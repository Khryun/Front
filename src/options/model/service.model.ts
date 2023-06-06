

export interface IServiceBase {
  service_id: number,
  name_service: string,
  cost: number,
}

export interface IService extends IServiceBase {
  duration: string,
}

export interface IServiceWithStartAndEndTime extends IServiceBase {
  start_order: string,
  end_order: string,
}
