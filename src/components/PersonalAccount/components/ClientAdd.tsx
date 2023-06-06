import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useEffect } from "react";
import FormClientAdd from "../forms/FormClientAdd";
import ResultSuccess from "../../Results/ResultSuccess";
import ResultErrorConflict from "../../Results/ResultErrorConflict";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


const notificationsStore = new NotificationsPAStoreClass();


const ClientAdd = observer(() => {
  useEffect(() => {
    return () => {
      notificationsStore.deleteNotificationsClient();
    }
  }, [])

  return (
    <div className="personal_account_forms_client">
      <h2 className="personal_account_forms_client_title title--border"> Добавить клиента </h2>
      <Row justify={'space-between'} className="personal_account_forms_client_row">
        <Col className="personal_account_client_form" span={6}>
          <FormClientAdd notificationsStore={notificationsStore} />
        </Col>
        <Col className="personal_account_client_result" span={18}>
          {notificationsStore?.isCreateClient &&
            <ResultSuccess title="Клиент успешно создан!" />
          }
          {notificationsStore?.isConflictClient &&
            <ResultErrorConflict title="Такой клиент уже создан!" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ClientAdd;