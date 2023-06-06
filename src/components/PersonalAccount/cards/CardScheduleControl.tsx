import { observer } from "mobx-react";
import { ReactNode } from "react";
import { IScheduleControl } from "../../../options/model/schedule.model";
import CardScheduleBase from "./CardScheduleBase";


interface CardScheduleControlProps {
  schedule: IScheduleControl,
  children?: ReactNode,
}


const CardScheduleControl = observer(({ schedule, ...props }: CardScheduleControlProps) => {
  return (
    <CardScheduleBase
      schedule={schedule}
    >
      <div className="card_schedule_info_inner" >
        <h3 className="card_schedule_info_inner_title"> Сотрудник </h3>
        <p className="card_schedule_info_inner_fullname"> {schedule.full_name} </p>
      </div>
      <div className="card_schedule_info_inner">
        <h3 className="card_schedule_info_inner_title"> Позиция </h3>
        <p className="card_schedule_info_inner_duration_post"> {schedule.post} </p>
      </div>
      <div className="card_schedule_info_inner">
        <h3 className="card_schedule_info_inner_title"> Присутствие </h3>
        {schedule.presence
          ? <p className="card_schedule_info_inner_duration_presence"> Да </p>
          : <p className="card_schedule_info_inner_duration_presence"> Нет </p>
        }
      </div>
      {props.children}
    </CardScheduleBase >
  )
});


export default CardScheduleControl;