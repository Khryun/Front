import { ISpecialist } from "../options/model/specialist.model";
import axios from "axios";


export default class SpecialistsServices {
  static pathDefault: string = "/specialists";


  static async getAll(): Promise<ISpecialist[]> {
    const specialists = await axios.get(this.pathDefault);

    return specialists.data;
  }

  static async getSpecialistsByEstablishmentId(establishmentId: number): Promise<ISpecialist[]> {
    const schedule = await axios.get( `/establishments/${establishmentId}/specialists`);

    return schedule.data;
  }
}