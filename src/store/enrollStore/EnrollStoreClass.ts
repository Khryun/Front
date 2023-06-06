import { makeAutoObservable } from "mobx";


class EnrollStoreClass {
  selectButtonClientIsClicked: boolean = false;
  selectButtonEstablishmentIsClicked: boolean = false;
  selectButtonSpecialistIsClicked: boolean = false;
  selectButtonServicesIsClicked: boolean = false;
  selectButtonDateIsClicked: boolean = false;

  isOpenFormFindClient: boolean = true;
  isOpenListEstablishment: boolean = true;
  isOpenListSpecialist: boolean = false;
  isOpenListServices: boolean = false;
  isOpenListDate: boolean = false;
  isSubmitOrder: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setSelectButtonClientIsClicked(boolean: boolean) {
    this.selectButtonClientIsClicked = boolean;
  }
  
  setSelectButtonEstablishmentIsClicked(boolean: boolean) {
    this.selectButtonEstablishmentIsClicked = boolean;
  }

  setSelectButtonSpecialistIsClicked(boolean: boolean) {
    this.selectButtonSpecialistIsClicked = boolean;
  }

  setSelectButtonServicesIsClicked(boolean: boolean) {
    this.selectButtonServicesIsClicked = boolean;
  }

  setSelectButtonDateIsClicked(boolean: boolean) {
    this.selectButtonDateIsClicked = boolean;
  }


  setIsOpenFormFindClient(boolean: boolean) {
    this.isOpenFormFindClient = boolean;
  }

  setIsOpenListEstablishment(boolean: boolean) {
    this.isOpenListEstablishment = boolean;
  }

  setIsOpenListSpecialist(boolean: boolean) {
    this.isOpenListSpecialist = boolean;
  }

  setIsOpenListServices(boolean: boolean) {
    this.isOpenListServices = boolean;
  }

  setIsOpenListDate(boolean: boolean) {
    this.isOpenListDate = boolean;
  }

  setIsSubmitOrder(boolean: boolean) {
    this.isSubmitOrder = boolean;
  }

  clearStore() {
    this.setSelectButtonDateIsClicked(false);
    this.setSelectButtonServicesIsClicked(false);
    this.setSelectButtonSpecialistIsClicked(false);
    this.setSelectButtonClientIsClicked(false);
    this.setSelectButtonEstablishmentIsClicked(false);
    this.setIsSubmitOrder(false);
    this.setIsOpenListDate(false);
    this.setIsOpenListServices(false);
    this.setIsOpenListSpecialist(false);
    this.setIsOpenListEstablishment(false);
    this.setIsOpenFormFindClient(true);
  }
}


export default EnrollStoreClass;