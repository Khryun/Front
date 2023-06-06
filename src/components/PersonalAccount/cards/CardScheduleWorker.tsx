import { ReactNode } from "react";
import { IScheduleWorker } from "../../../options/model/schedule.model";
import CardScheduleBase from "./CardScheduleBase";


interface CardScheduleWorkerProps {
  schedule: IScheduleWorker,
  children?: ReactNode,
}


const CardScheduleWorker = ({ schedule, ...props }: CardScheduleWorkerProps) => {
  return (
    <CardScheduleBase
      schedule={schedule}
    >
      <div className="card_schedule_info_inner">
        <h3 className="card_schedule_info_inner_title"> Адрес работы </h3>
        <p className="card_schedule_info_inner_address"> {schedule.address_establishment} </p>
      </div>
      {props.children}
    </CardScheduleBase>
  )
};


export default CardScheduleWorker;