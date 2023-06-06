import { IEstablishment, IEstablishmentBase } from "../../options/model/establishment.model";
import { makeAutoObservable } from "mobx";
import EstablishmentServices from "../../services/establishment.service";


class EstablishmentPAStoreClass {
  EstablishmentsList: IEstablishment[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async getEstablishmentsList(): Promise<void> {
    const establishments: IEstablishment[] = await EstablishmentServices.getAll();
    this.setEstablishmentsList(establishments);
  }


  setEstablishmentsList(establishments: IEstablishment[]) {
    this.EstablishmentsList = establishments;
  }

  deleteEstablishmentsList() {
    this.setEstablishmentsList([]);
  }
}


export default EstablishmentPAStoreClass;