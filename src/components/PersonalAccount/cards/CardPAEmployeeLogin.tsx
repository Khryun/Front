import '../../../style/css/cards/cardPAEmployeeLogin.css'
import { Card } from "antd";
import { IEmployeeLogin } from "../../../options/model/employeeLogin.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import { CSSProperties, ReactNode } from "react";


interface ICardPAEmployeeLoginProps {
  title?: string,
  employee: IEmployeeLogin,
  style?: CSSProperties
  children?: ReactNode,
}


export const CardPAEmployeeLogin = (props: ICardPAEmployeeLoginProps) => {
  return (
    <Card
      className="cardbase_employeelogin"
      title={props.title}
      style={{ width: "300px", ...CardForm, ...props.style }}
      bodyStyle={CardBodyForm}
    >
      <div className="cardbase_employeelogin_info">
        <div className="cardbase_employeelogin_info_inner" >
          <h3 className="cardbase_employeelogin_info_inner_title"> ФИО </h3>
          <p className="cardbase_employeelogin_info_inner_fullname"> {props.employee.full_name} </p>
        </div>
        <div className="cardbase_employeelogin_info_inner">
          <h3 className="cardbase_employeelogin_info_inner_title"> Номер телефона </h3>
          <p className="cardbase_employeelogin_info_inner_telephone"> {props.employee.telephone} </p>
        </div>
        <div className="cardbase_employeelogin_info_inner">
          <h3 className="cardbase_employeelogin_info_inner_title"> Специальность </h3>
          <p className="cardbase_employeelogin_info_inner_post"> {props.employee.post} </p>
        </div>
        <div className="cardbase_employeelogin_info_inner">
          <h3 className="cardbase_employeelogin_info_inner_title"> Логин </h3>
          {props.employee.login
            ? <p className="cardbase_employeelogin_info_inner_email"> {props.employee.login} </p>
            : <p className="cardbase_employeelogin_info_inner_email"> Отсутствует </p>
          }
        </div>
        {props.children}
      </div>
    </Card>
  )
};


export default CardPAEmployeeLogin;