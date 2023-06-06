import { IClient, IClientCreate, IClientUpdate } from "../options/model/client.model";
import axios from "axios";


export default class ClientServices {
  static pathDefault: string = "/clients";


  static async getAll(): Promise<IClient[]> {
    const clients = await axios.get(this.pathDefault);

    return clients.data;
  }

  static async getClientByTelephone(telephone: string): Promise<IClient> {
    const client = await axios.get(`${this.pathDefault}/info`, {
      params: {
        telephone: telephone,
      }
    });

    return client.data;
  }

  static async getClient(clientId: number): Promise<IClient> {
    const client = await axios.get(`${this.pathDefault}/${clientId}`);

    return client.data;
  }

  static async createClient(clientAdd: IClientCreate): Promise<void> {
    await axios.post(this.pathDefault, clientAdd);
  }

  static async updateClient(clientId: number, clientUpdate: IClientUpdate): Promise<void> {
    await axios.patch(`${this.pathDefault}/${clientId}`, clientUpdate);
  }

  static async deleteClient(clientId: number): Promise<void> {
    await axios.delete(`${this.pathDefault}/${clientId}`);
  }
}