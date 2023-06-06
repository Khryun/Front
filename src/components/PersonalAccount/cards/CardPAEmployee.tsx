import { ReactNode } from "react";
import { IEmployee } from "../../../options/model/employee.model";
import CardPABase from "./CardPABase";


interface ICardPAEmployeeProps {
  title?: string,
  employee: IEmployee,
  children?: ReactNode,
}


export const CardPAEmployee = (props: ICardPAEmployeeProps) => {
  return (
    <CardPABase
      title={props.title}
      info={props.employee}
      style={{ width: "300px" }}
    >
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Возраст </h3>
        <p className="cardbase_inner_info_age"> {props.employee.age} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Опыт работы </h3>
        <p className="cardbase_inner_info_amount_experience"> {props.employee.experience} мес. </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Зарплата </h3>
        <p className="cardbase_inner_info_salary"> {props.employee.salary} </p>
      </div>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_inner_info_title"> Позиция </h3>
        <p className="cardbase_inner_info_post"> {props.employee.post} </p>
      </div>
      {props.children}
    </CardPABase>
  )
};


export default CardPAEmployee;