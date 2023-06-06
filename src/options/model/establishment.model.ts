

export interface IEstablishmentBase {
  establishment_id: number,
  address_establishment: string,
}

export interface IEstablishment extends IEstablishmentBase{
  postcode: string,
  telephone: string,
  amount_employees: number,
}