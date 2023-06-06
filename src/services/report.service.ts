import { IReportDownload, IReportEstablishments, IReportServices, IReportSpecialists } from "../options/model/report.model";
import axios from "axios";


interface Duration {
  start_date: string,
  end_date: string,
}

interface File {
  file: any,
  nameFile: string | null,
}


export default class ReportServices {
  static pathDefault: string = "/report";


  static async getReportServices(duration: Duration): Promise<IReportServices[]> {
    const report = await axios.post(`/services${this.pathDefault}`, {
      start_date: duration.start_date,
      end_date: duration.end_date,
    });

    return report.data;
  }

  static async getReportSpecialists(duration: Duration): Promise<IReportSpecialists[]> {
    const report = await axios.post(`/specialists${this.pathDefault}`, {
      start_date: duration.start_date,
      end_date: duration.end_date,
    });

    return report.data;
  }

  static async getReportEstablishments(duration: Duration): Promise<IReportEstablishments[]> {
    const report = await axios.post(`/establishments${this.pathDefault}`, {
      start_date: duration.start_date,
      end_date: duration.end_date,
    });

    return report.data;
  }

  static async downloadReportEstablishments(range: IReportDownload): Promise<File> {
    const file = await axios.get(`/establishments${this.pathDefault}/download`, {
      responseType: "blob",
      params: {
        start_date: range.start_date,
        end_date: range.end_date,
      }
    });

    if (file.headers["content-disposition"]) {
      const contentDisposition = file.headers["content-disposition"];
      const match = contentDisposition.match(/filename\*=utf-8''(.+\.csv)/i);
      const decodeNameFile = decodeURI(match[1]);
      return { file: file.data, nameFile: decodeNameFile }
    }

    return { file: file.data, nameFile: null };
  }

  static async downloadReportServices(range: IReportDownload): Promise<File> {
    const file = await axios.get(`/services${this.pathDefault}/download`, {
      responseType: "blob",
      params: {
        start_date: range.start_date,
        end_date: range.end_date,
      }
    });

    if (file.headers["content-disposition"]) {
      const contentDisposition = file.headers["content-disposition"];
      const match = contentDisposition.match(/filename\*=utf-8''(.+\.csv)/i);
      const decodeNameFile = decodeURI(match[1]);
      return { file: file.data, nameFile: decodeNameFile }
    }
    return { file: file.data, nameFile: null };
  }

  static async downloadReportSpecialists(range: IReportDownload): Promise<File> {
    const file = await axios.get(`/specialists${this.pathDefault}/download`, {
      responseType: "blob",
      params: {
        start_date: range.start_date,
        end_date: range.end_date,
      }
    });

    if (file.headers["content-disposition"]) {
      const contentDisposition = file.headers["content-disposition"];
      const match = contentDisposition.match(/filename\*=utf-8''(.+\.csv)/i);
      const decodeNameFile = decodeURI(match[1]);
      return { file: file.data, nameFile: decodeNameFile }
    }

    return { file: file.data, nameFile: null };
  }
}