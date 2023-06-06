

export interface IClientBase {
  client_id: number
  full_name: string,
  telephone: string,
}

export interface IClientCreate extends IClientBase {
  email: string | undefined,
}

export interface IClient extends IClientCreate {
  amount_visits: number,
  bonus: number,
  estate: string,
}

export interface IClientUpdate {
  full_name: string,
  telephone: string,
  email: string | undefined,
}