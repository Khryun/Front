import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useEffect } from "react";
import ResultSuccess from "../../Results/ResultSuccess";
import FormEmployeeAdd from "../forms/FormEmployeeAdd";
import ResultErrorConflict from "../../Results/ResultErrorConflict";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


const notificationsStore = new NotificationsPAStoreClass();


const EmployeeAdd = observer(() => {
  useEffect(() => {
    return () => {
      notificationsStore.deleteNotificationsEmployee();
    }
  }, [])

  return (
    <div className="employee_add">
      <h2 className="employee_add_title title--border"> Добавить сотрудника </h2>
      <Row
        justify={'space-between'}
        className="employee_add_row"
      >
        <Col className="employee_add_form" span={6}>
          <FormEmployeeAdd
            notificationsStore={notificationsStore} />
        </Col>
        <Col className="employee_add_result" span={18}>
          {notificationsStore?.isCreateEmployee &&
            <ResultSuccess title="Сотрудник успешно создан!" />
          }
          {notificationsStore?.isConflictEmployee &&
            <ResultErrorConflict title="Такой сотрудник уже создан!" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default EmployeeAdd;