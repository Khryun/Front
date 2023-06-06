import { IEstablishment } from "../options/model/establishment.model";
import axios from "axios";


export default class EstablishmentServices {
  static pathDefault: string = "/establishments";


  static async getAll(): Promise<IEstablishment[]> {
    const establishments = await axios.get(this.pathDefault);

    return establishments.data;
  }
}