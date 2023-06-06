import '../style/css/auth.css';
import '../style/css/main.css';
import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import { Card, Col, Row } from "antd";
import CardCheck from "../components/PersonalAccount/cards/CardCheck";
import loginStore from "../store/LoginStoreClass";


//НА ПЕРЕДЕЛКЕ
export const UserPA = observer(() => {

  if (!loginStore.isLogin) {
    return <Navigate to="/auth" />
  }
  

  return (
    <div className="">
      <h1 className="auth_header"> Личный кабинет </h1>
      <Row className="auth_row">
        <Col className="auth_user_info" span={4}>
          <Card title="Ваши сведения">
            <div className="auth_user_info_fullname auth_user_info_inner">
              <h3 className="auth_user_info_fullname_title auth_user_info_inner_title"> ФИО </h3>
              <p className="auth_user_info_fullname_name"> Сильняков Сергей Евгеньевич </p>
            </div>
            <div className="auth_user_info_telephone auth_user_info_inner">
              <h3 className="auth_user_info_telephone_title auth_user_info_inner_title"> Номер телефона </h3>
              <p className="auth_user_info_telephone_phone"> 8 (800) 555-35-35 </p>
            </div>
            <div className="auth_user_info_email auth_user_info_inner">
              <h3 className="auth_user_info_email_title auth_user_info_inner_title"> Почта </h3>
              <p className="auth_user_info_email_phone"> super@puper.com </p>
            </div>
            <div className="auth_user_info_bonus auth_user_info_inner">
              <h3 className="auth_user_info_bonus_title auth_user_info_inner_title"> Количество бонусов </h3>
              <p className="auth_user_info_bonus_phone"> 999 </p>
            </div>
          </Card>
        </Col>
        <Col className="auth_user_checks" span={19}>
          <h2 className="auth_user_checks_title title--border"> Ваши последние заказы </h2>
          <Row className="auth_user_checks_info">
            <Col className="auth_user_checks_cards" span={4}>
              {/* <CardCheck /> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
});