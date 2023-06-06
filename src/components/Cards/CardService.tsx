import { Card } from "antd";
import { IService } from "../../options/model/service.model";
import { CardBody, CardTitle } from "../../style/typescript/cardService";
import { ClockCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";


interface IServiceCard {
  service: IService;
}


const CardService = ({ service }: IServiceCard) => {
  return (
    <Card
      title={"Услуга №" + service.service_id}
      headStyle={CardTitle}
      bodyStyle={CardBody}
      >
      <p className="services_and_price_card_name"> {service.name_service} </p>
      <p> <ClockCircleOutlined /> {service.duration} мин. </p>
      <p> <DollarCircleOutlined /> {service.cost} руб. </p>
    </Card>
  )
};


export default CardService;