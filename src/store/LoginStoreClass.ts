import { IUser } from "../options/model/user.model";
import { makeAutoObservable } from "mobx";


class LoginStoreClass {
  isLogin: boolean = false;
  user: IUser | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  setIsLogin(boolean: boolean) {
    this.isLogin = boolean;
  }

  setUser(user: IUser) {
    this.user = user;
  }
};


const loginStore = new LoginStoreClass();
export default loginStore;