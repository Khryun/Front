import { Card } from "antd";
import { CardForm } from "../../../style/typescript/cardForm";
import { IService } from "../../../options/model/service.model";
import { CardBodyForm } from "../../../style/typescript/cardForm";
import { ClockCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";


interface ICardServiceProps {
  title?: string,
  service: IService,
}


export const CardService = (props: ICardServiceProps) => {
  return (
    <Card
      title={props.title}
      style={{ width: "300px", ...CardForm }}
      bodyStyle={CardBodyForm}
    >
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Наименование </h3>
        <p className="cardbase_inner_info_name"> {props.service.name_service} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Длительность </h3>
        <p className="cardbase_inner_info_duration"> <ClockCircleOutlined /> {props.service.duration} мин </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Стоимость </h3>
        <p className="cardbase_inner_info_cost"> <DollarCircleOutlined /> {props.service.cost} руб </p>
      </div>
    </Card>
  )
};


export default CardService;