import { IClient } from "../../options/model/client.model";
import { makeAutoObservable } from "mobx";


class ClientPAStoreClass {
  client: IClient | undefined = undefined;
  clients: IClient[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  setClient(client: IClient | undefined) {
    this.client = client;
  }

  setClients(clients: IClient[]) {
    this.clients = clients;
  }

  deleteClient() {
    this.setClient(undefined);
  }

  deleteClients() {
    this.setClients([]);
  }
};


export default ClientPAStoreClass;