

export interface IScheduleSpecialist {
  date: string,
  times: string[],
}


export interface IScheduleWorker {
  schedule_id: number,
  date_work: string,
  start_work: string,
  end_work: string,
  address_establishment: string,
}

export interface IScheduleControl extends IScheduleWorker {
  full_name: string,
  post: string,
  presence: boolean,
}


export interface IScheduleControlFind {
  date_work: string,
  telephone: string | undefined,
  presence: boolean | undefined,
}

export interface IScheduleControlUpdate {
  date_work: string,
  start_work: string | undefined,
  end_work: string | undefined,
  presence: boolean,
}


export interface IScheduleControlCreate {
  date_work: string,
  start_work: string,
  end_work: string,
  // address_establishment: string, //?
  telephone: string,
}
