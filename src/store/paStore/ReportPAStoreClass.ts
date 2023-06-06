import { ICheck } from "../../options/model/check.model";
import { makeAutoObservable } from "mobx";
import { IReportDownload, IReportEstablishments, IReportServices, IReportSpecialists } from "../../options/model/report.model";


class ReportPAStoreClass {
  reportServices: IReportServices[] = [];
  reportSpecialists: IReportSpecialists[] = [];
  reportEstablishments: IReportEstablishments[] = [];
  reportRangeDate: IReportDownload | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  setReportServices(report: IReportServices[]) {
    this.reportServices = report;
  }

  setReportSpecialists(report: IReportSpecialists[]) {
    this.reportSpecialists = report;
  }

  setReportEstablishments(report: IReportEstablishments[]) {
    this.reportEstablishments = report;
  }

  setReportRangeDate(range: IReportDownload | undefined) {
    this.reportRangeDate = range;
  }


  deleteReportServices() {
    this.setReportServices([]);
  }

  deleteReportSpecialists() {
    this.setReportSpecialists([]);
  }

  deleteReportEstablishments() {
    this.setReportEstablishments([]);
  }

  deleteReportRangeDate() {
    this.setReportRangeDate(undefined);
  }
};


export default ReportPAStoreClass;