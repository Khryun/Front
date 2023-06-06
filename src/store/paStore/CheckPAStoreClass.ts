import { ICheck } from "../../options/model/check.model";
import { makeAutoObservable } from "mobx";


class CheckPAStoreClass {
  checks: ICheck[] = [];
  checksChoiceDate: string | undefined = undefined;
  checksRadioIsPaid: boolean | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  setChecks(checks: ICheck[]) {
    this.checks = checks;
  }

  setChecksChoiceDate(date: string | undefined) {
    this.checksChoiceDate = date;
  }

  setChecksRadioIsPaid(isPaid: boolean | undefined) {
    this.checksRadioIsPaid = isPaid;
  }

  deleteChecks() {
    this.setChecks([]);
  }

  deleteChecksChoiceDate() {
    this.setChecksChoiceDate(undefined);
  }

  deleteChecksRadioPaid() {
    this.setChecksRadioIsPaid(undefined);
  }
};


export default CheckPAStoreClass;