import { IClient } from "../../../options/model/client.model";
import { ReactNode } from "react";
import CardPABase from "./CardPABase";


interface ICardPAClientProps {
  title?: string,
  client: IClient,
  children?: ReactNode,
}


export const CardPAClient = (props: ICardPAClientProps) => {
  return (
    <CardPABase
      title={props.title}
      info={props.client}
      style={{ width: "300px" }}
    >
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Количество визитов </h3>
        <p className="cardbase_inner_info_amount_visits"> {props.client.amount_visits} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Бонусы </h3>
        <p className="cardbase_inner_info_bonus"> {props.client.bonus} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Статус </h3>
        <p className="cardbase_inner_info_estate"> {props.client.estate} </p>
      </div>
      {props.children}
    </CardPABase>
  )
};


export default CardPAClient;