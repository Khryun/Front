import '../../style/css/personal_account/paControl.css';
import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import OrderAdd from "../../components/PersonalAccount/components/OrderAdd";
import OrderFind from "../../components/PersonalAccount/components/OrderFind";
import ClientAdd from "../../components/PersonalAccount/components/ClientAdd";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import ClientFind from "../../components/PersonalAccount/components/ClientFind";
import ScheduleAdd from "../../components/PersonalAccount/components/ScheduleAdd";
import EmployeeAdd from "../../components/PersonalAccount/components/EmployeeAdd";
import ScheduleFind from "../../components/PersonalAccount/components/ScheduleFind";
import EmployeeFind from "../../components/PersonalAccount/components/EmployeeFind";
import ScheduleWorkerFind from "../../components/PersonalAccount/components/ScheduleWorkerFind";


const PAControl = () => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenFindEmployeeForm, setIsOpenFindEmployeeForm] = useState<boolean>(false);
  const [isOpenAddEmployeeForm, setIsOpenAddEmployeeForm] = useState<boolean>(false);
  const [isOpenFindScheduleForm, setIsOpenFindScheduleForm] = useState<boolean>(false);
  const [isOpenAddScheduleForm, setIsOpenAddScheduleForm] = useState<boolean>(false);
  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenAddOrderClientForm] = useState<boolean>(false);
  const [isOpenFindScheduleMeForm, setIsOpenFindScheduleMeForm] = useState<boolean>(false);


  const closeAllWindow = () => {
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenAddEmployeeForm(false);
    setIsOpenFindEmployeeForm(false);
    setIsOpenAddScheduleForm(false);
    setIsOpenFindScheduleForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenFindScheduleMeForm(false);
  }

  const onClickFoundClientButton = () => {
    closeAllWindow();
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }

  const onClickAddClientButton = () => {
    closeAllWindow();
    setIsOpenAddClientForm(!isOpenAddClientForm);
  }

  const onClickFoundEmployeeButton = () => {
    closeAllWindow();
    setIsOpenFindEmployeeForm(!isOpenFindEmployeeForm);
  }

  const onClickAddEmployeeButton = () => {
    closeAllWindow();
    setIsOpenAddEmployeeForm(!isOpenAddEmployeeForm);
  }

  const onClickFoundScheduleButton = () => {
    closeAllWindow();
    setIsOpenFindScheduleForm(!isOpenFindScheduleForm);
  }

  const onClickAddScheduleButton = () => {
    closeAllWindow();
    setIsOpenAddScheduleForm(!isOpenAddScheduleForm);
  }

  const onClickScheduleMeButton = () => {
    closeAllWindow();
    setIsOpenFindScheduleMeForm(!isOpenFindScheduleMeForm);
  }


  return (
    <div className="personal_account_control_page">
      <h1 className="personal_account_control_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_control_row">
        <Col className="personal_account_control_info" span={4}>
          <CardPAUser />
          <Space
            className="personal_account_manager_control_buttons"
            direction="vertical"
            style={{ width: "100%" }}>
            <Button block onClick={onClickFoundClientButton}> <SearchOutlined /> Найти клиента </Button>
            <Button block onClick={onClickAddClientButton}> <UserAddOutlined /> Добавить клиента </Button>
            <Button block onClick={onClickFoundEmployeeButton}> <SearchOutlined /> Найти сотрудника </Button>
            <Button block onClick={onClickAddEmployeeButton}> <UserAddOutlined /> Добавить сотрудника </Button>
            <Button block onClick={onClickFoundScheduleButton}> <SearchOutlined /> Посмотреть расписание </Button>
            <Button block onClick={onClickAddScheduleButton}> <FileAddOutlined /> Добавить расписание </Button>
            <Button block onClick={onClickScheduleMeButton}> <SearchOutlined /> Посмотреть своё расписание </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_control_forms"
          span={20}
        >
          {isOpenFindClientForm &&
            <ClientFind
              isDeleteClient={true}
              isFindAllButton={true}
              isUpdateClient={true}
            />
          }
          {isOpenAddClientForm &&
            <ClientAdd />
          }
          {isOpenFindEmployeeForm &&
            <EmployeeFind
              isDeleteClient={true}
              isUpdateEmployee={true}
            />
          }
          {isOpenAddEmployeeForm &&
            <EmployeeAdd />
          }
          {isOpenFindScheduleForm &&
            <ScheduleFind isChangeButton={true} />
          }
          {isOpenAddScheduleForm &&
            <ScheduleAdd />
          }
          {isOpenFindScheduleMeForm &&
            <ScheduleWorkerFind />
          }
        </Col>
      </Row>
    </div>
  )
}


export default PAControl;