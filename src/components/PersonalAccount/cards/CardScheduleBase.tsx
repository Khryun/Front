import '../../../style/css/cards/cardSchedule.css';
import { Card } from "antd";
import { observer } from "mobx-react";
import { IScheduleControl, IScheduleWorker } from "../../../options/model/schedule.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import { CSSProperties, ReactNode } from "react";


interface CardScheduleBaseProps {
  schedule: IScheduleWorker | IScheduleControl,
  children?: ReactNode,
  style?: CSSProperties | undefined,
}


const CardScheduleBase = observer(({ schedule, ...props }: CardScheduleBaseProps) => {
  return (
    <Card
      className="card_schedule"
      style={{ width: "300px", ...CardForm, ...props.style, }}
      bodyStyle={CardBodyForm}
    >
      <div className="card_schedule_info">
        <div className="card_schedule_info_inner" >
          <h3 className="card_schedule_info_inner_title"> Дата работы </h3>
          <p className="card_schedule_info_inner_date"> {new Date(schedule.date_work).toLocaleDateString()} </p>
        </div>
        <div className="card_schedule_info_inner">
          <h3 className="card_schedule_info_inner_title"> Рабочий день </h3>
          <p className="card_schedule_info_inner_duration_day"> {schedule.start_work} — {schedule.end_work}</p>
        </div>
        {props.children}
      </div>
    </Card>
  )
});


export default CardScheduleBase;