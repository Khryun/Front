import { ICheck } from "../../../options/model/check.model";
import { IClient } from "../../../options/model/client.model";
import { observer } from "mobx-react";
import { Button, Col, Pagination, Row, Space, message } from "antd";
import { useEffect, useState } from "react";
import CardCheck from "../cards/CardCheck";
import CheckServices from "../../../services/check.service";
import FormOrderFind from "../forms/FormOrderFind";
import ClientServices from "../../../services/client.service";
import FormClientFind from "../forms/FormClientFind";
import CheckPAStoreClass from "../../../store/paStore/CheckPAStoreClass";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import ResultSuccessNoData from "../../Results/ResultSuccessNoData";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


const pageSize: number = 3;
const checkStore = new CheckPAStoreClass();
const clientStore = new ClientPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

interface OrderFindProps {
  isFindAllButton?: boolean,
}


const OrderFind = observer((props: OrderFindProps) => {
  const [isPaidCheck, setIsPaidCheck] = useState<boolean>(false);
  const [isDeleteCheck, setIsDeleteCheck] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState<number>(1);


  const handlerGetOrders = async () => {
    notificationsStore?.deleteNotificationsClient();
    notificationsStore?.deleteNotificationsChecks();
    clientStore.deleteClient();
    checkStore.deleteChecks();

    await CheckServices.getAll()
      .then((checks: ICheck[]) => {
        if (checks.length) {
          checkStore.setChecks(checks);
        } else {
          notificationsStore?.setIsEmptyChecks(true);
        }
      })
      .catch(() => {
        notificationsStore?.setIsNotFindChecks(true);
      })
  }

  const getChecksAfterDelete = () => {
    CheckServices.getChecksByClientId(clientStore.client!.client_id)
      .then((checks: ICheck[]) => {
        if (!checks.length) {
          notificationsStore?.setIsEmptyChecks(true);
        }
        checkStore.setChecks(checks);
      });
  }

  const handlerDeleteCheck = (boolean: boolean) => {
    setIsDeleteCheck(boolean);
  }

  const handlerPaidCheck = (boolean: boolean) => {
    setIsPaidCheck(boolean);
  }


  useEffect(() => {
    return () => {
      checkStore.deleteChecks();
      clientStore.deleteClient();
      notificationsStore.deleteNotificationsClient();
      notificationsStore.deleteNotificationsChecks();
    }
  }, [])


  useEffect(() => {
    if (isDeleteCheck) {
      getChecksAfterDelete();
      setIsDeleteCheck(false);
    }

    if (isPaidCheck) {
      getChecksAfterDelete();
      ClientServices.getClient(clientStore.client!.client_id)
        .then((client: IClient) => {
          clientStore.setClient(client);
          setIsPaidCheck(false);
        })
    }
  }, [isPaidCheck, isDeleteCheck])


  return (
    <div className="personal_account_forms_order">
      <h2 className="personal_account_forms_order_title title--border"> Найти заказ </h2>
      {contextHolder}
      <Row
        className="personal_account_forms_order_row"
        justify={'space-between'}
        wrap={false}>
        <Col
          className="personal_account_order_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          {!clientStore.client
            ? <FormClientFind
              clientStore={clientStore}
              notificationsStore={notificationsStore}
            />
            : <FormOrderFind
              clientStore={clientStore}
              checkStore={checkStore}
              notificationsStore={notificationsStore}
            />
          }
          {props.isFindAllButton &&
            <Button
              block
              style={{ marginTop: "10px" }}
              onClick={handlerGetOrders}
            >
              Найти все
            </Button>
          }
        </Col>
        <Col className="personal_account_order_result" span={18}>
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {clientStore.client
              ? checkStore.checks.filter((check: ICheck, index: number) => {
                return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
              }).map((check: ICheck) =>
                <CardCheck
                  check={check}
                  bonus={clientStore.client!.bonus}
                  clientId={clientStore.client!.client_id}
                  key={check.check_id}
                  isChangeChecks={true}
                  messageApi={messageApi}
                  setDeleteCheckFlag={handlerDeleteCheck}
                  setPaidCheckFlag={handlerPaidCheck}
                />
              )
              : checkStore.checks.filter((check: ICheck, index: number) => {
                return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
              }).map((check: ICheck) =>
                <CardCheck
                  check={check}
                  key={check.check_id}
                  setDeleteCheckFlag={handlerDeleteCheck}
                />
              )}
          </Space>
          {checkStore.checks.length !== 0 &&
            <Pagination
              current={page}
              pageSize={pageSize}
              onChange={setPage}
              style={{ marginTop: "30px" }}
              total={checkStore.checks.length || 0}
            />
          }


          {notificationsStore?.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore?.isEmptyChecks &&
            <ResultSuccessNoData subTitle="У клиента нет заказов" />
          }
          {notificationsStore?.isNotFindChecks &&
            <ResultErrorNotCorrectData title="Заказы не были найдены" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default OrderFind;