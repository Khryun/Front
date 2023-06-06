import { Card } from "antd";
import { CardForm } from "../../../style/typescript/cardForm";
import { CardBodyForm } from "../../../style/typescript/cardForm";
import { IEstablishment } from "../../../options/model/establishment.model";


interface ICardPAEstablishmentProps {
  title?: string,
  establishment: IEstablishment,
}


export const CardEstablishment = (props: ICardPAEstablishmentProps) => {
  return (
    <Card
      title={props.title}
      style={{ width: "300px", ...CardForm }}
      bodyStyle={CardBodyForm}
    >
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Адрес </h3>
        <p className="cardbase_inner_info_address"> {props.establishment.address_establishment} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Почтовый индекс </h3>
        <p className="cardbase_inner_info_postcode"> {props.establishment.postcode} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Количество работников </h3>
        <p className="cardbase_inner_info_amount_employess"> {props.establishment.amount_employees} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Телефон </h3>
        <p className="cardbase_inner_info_telephone"> {props.establishment.telephone} </p>
      </div>
    </Card>
  )
};


export default CardEstablishment;