import '../../style/css/personal_account/paManager.css';
import { observer } from "mobx-react";
import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import OrderAdd from "../../components/PersonalAccount/components/OrderAdd";
import ClientAdd from "../../components/PersonalAccount/components/ClientAdd";
import OrderFind from "../../components/PersonalAccount/components/OrderFind";
import ClientFind from "../../components/PersonalAccount/components/ClientFind";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import ScheduleWorkerFind from "../../components/PersonalAccount/components/ScheduleWorkerFind";


const PAManager = observer(() => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenAddOrderClientForm] = useState<boolean>(false);
  const [isOpenFindScheduleMeForm, setIsOpenFindScheduleMeForm] = useState<boolean>(false);


  const onClickFoundClientButton = () => {
    setIsOpenAddClientForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenFindScheduleMeForm(false);
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }
  
  const onClickAddClientButton = () => {
    setIsOpenFindClientForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenFindScheduleMeForm(false);
    setIsOpenAddClientForm(!isOpenAddClientForm);
  }
  
  const onClickAddOrderButton = () => {
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenFindScheduleMeForm(false);
    setIsOpenAddOrderClientForm(!isOpenAddOrderForm);
  }
  
  const onClickFindOrderButton = () => {
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindScheduleMeForm(false);
    setIsOpenFindOrderClientForm(!isOpenFindOrderForm);
  }
  
  const onClickScheduleMeButton = () => {
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenFindScheduleMeForm(!isOpenFindScheduleMeForm);
  }


  return (
    <div className="personal_account_manager_page">
      <h1 className="personal_account_manager_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_manager_row">
        <Col className="personal_account_manager_info" span={4}>
          <CardPAUser />
          <Space
            className="personal_account_manager_control_buttons"
            direction="vertical"
            style={{ width: "100%" }}>
            <Button block onClick={onClickFoundClientButton}> <SearchOutlined /> Найти клиента </Button>
            <Button block onClick={onClickAddClientButton}> <UserAddOutlined /> Добавить клиента </Button>
            <Button block onClick={onClickFindOrderButton}> <SearchOutlined /> Найти заказ </Button>
            <Button block onClick={onClickAddOrderButton}> <FileAddOutlined /> Добавить заказ </Button>
            <Button block onClick={onClickScheduleMeButton}> <SearchOutlined /> Посмотреть своё расписание </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_manager_forms"
          span={20}
        >
          {isOpenFindClientForm &&
            <ClientFind isDeleteClient={true} />
          }
          {isOpenAddClientForm &&
            <ClientAdd />
          }
          {isOpenFindOrderForm &&
            <OrderFind />
          }
          {isOpenAddOrderForm &&
            <OrderAdd />
          }
          {isOpenFindScheduleMeForm &&
            <ScheduleWorkerFind />
          }
        </Col>
      </Row>
    </div>
  )
});


export default PAManager;