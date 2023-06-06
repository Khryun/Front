import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import EmployeeLoginFind from "../../components/PersonalAccount/components/EmployeeLoginFind";
import ScheduleWorkerFind from "../../components/PersonalAccount/components/ScheduleWorkerFind";


const PAAdmin = () => {
  const [isOpenFindScheduleMeForm, setIsOpenFindScheduleMeForm] = useState<boolean>(false);
  const [isOpenRegisterEmployeeForm, setIsOpenRegisterEmployeeForm] = useState<boolean>(false);


  const onClickFoundScheduleButton = async () => {
    setIsOpenRegisterEmployeeForm(false);
    setIsOpenFindScheduleMeForm(!isOpenFindScheduleMeForm);
  }

  const onClickRegisterEmployeeButton = () => {
    setIsOpenFindScheduleMeForm(false);
    setIsOpenRegisterEmployeeForm(!isOpenRegisterEmployeeForm);
  }


  return (
    <div className="personal_account_admin_page">
      <h1 className="personal_account_admin_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_admin_row">
        <Col
          className="personal_account_admin_info"
          span={4}
          style={{ paddingRight: "20px" }}
        >
          <CardPAUser />
          <Space
            className="personal_account_manager_admin_buttons"
            direction="vertical"
            style={{ width: "100%", marginTop: "20px" }}>
            <Button block onClick={onClickRegisterEmployeeButton}>
              <SearchOutlined /> Выдать пароль
            </Button>
            <Button block onClick={onClickFoundScheduleButton}>
              <SearchOutlined /> Посмотреть своё расписание
            </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_admin_forms"
          span={20}
          style={{ paddingLeft: "20px" }}
        >
          {isOpenRegisterEmployeeForm &&
            <EmployeeLoginFind />
          }
          {isOpenFindScheduleMeForm &&
            <ScheduleWorkerFind />
          }
        </Col>
      </Row>
    </div>
  )
}


export default PAAdmin;