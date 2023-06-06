import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { IClient, IClientUpdate } from "../../../options/model/client.model";
import { Button, Col, Pagination, Row, Space, message } from "antd";
import CardPAClient from "../cards/CardPAClient";
import ResultSuccess from "../../Results/ResultSuccess";
import ClientServices from "../../../services/client.service";
import FormClientFind from "../forms/FormClientFind";
import ModalUpdateClient from "../modals/ModalUpdateClient";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


const pageSize: number = 6;
const clientStore = new ClientPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

interface ClientFindProps {
  isFindAllButton?: boolean,
  isUpdateClient?: boolean,
  isDeleteClient?: boolean,
}


const ClientFind = observer((props: ClientFindProps) => {
  const [form] = useForm();
  const [page, setPage] = useState<number>(1);
  const [messageApi, contextHolder] = message.useMessage();


  const errorUpdateClient = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка обновления клиента!",
    });
  }

  const successUpdateClient = () => {
    messageApi.open({
      type: "success",
      content: "Клиент успешно обновлён!",
    });
  }

  const errorDeleteClient = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка удаления клиента!",
    });
  }


  const handlerGetClients = async () => {
    notificationsStore?.deleteNotificationsClient();
    clientStore.deleteClient();
    clientStore.deleteClients();
    const clients: IClient[] = await ClientServices.getAll();
    clientStore.setClients(clients);
  }

  const onFinish = async (values: IClientUpdate) => {
    const correctValue: IClientUpdate = {
      ...values,
      "full_name": values["full_name"]?.length ? values["full_name"] : clientStore.client!.full_name,
      "telephone": values["telephone"]?.length ? values["telephone"] : clientStore.client!.telephone,
      "email": values["email"]?.length ? values["email"] :
        values["email"] !== undefined ? undefined : clientStore.client!.email,
    }

    await ClientServices.updateClient(clientStore.client!.client_id, correctValue)
      .then(async () => {
        successUpdateClient();
        const client = await ClientServices.getClient(clientStore.client!.client_id);
        clientStore.setClient(client);
      })
      .catch(() => errorUpdateClient());
  }

  const handlerUpdateClient = (client: IClientUpdate) => {
    ModalUpdateClient(form, client, onFinish);
  };

  const handlerDeleteClient = async () => {
    await ClientServices.deleteClient(clientStore.client!.client_id)
      .then(() => {
        clientStore.deleteClient();
        notificationsStore?.setIsDeleteClient(true);
      })
      .catch(() => errorDeleteClient());
  }


  useEffect(() => {
    return () => {
      clientStore.deleteClient();
      clientStore.deleteClients();
      notificationsStore.deleteNotificationsClient();
    }
  }, [])


  return (
    <div className="client_find">
      <h2 className="client_find_title title--border"> Найти клиента </h2>
      {contextHolder}
      <Row
        justify={'space-between'}
        className="client_find_row"
      >
        <Col
          className="client_find_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormClientFind
            notificationsStore={notificationsStore}
            clientStore={clientStore}
          />
          {props.isFindAllButton &&
            <Button
              block
              style={{ marginTop: "10px" }}
              onClick={handlerGetClients}
            >
              Найти всех
            </Button>
          }
        </Col>
        <Col
          className="client_find_result"
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          {clientStore.client && clientStore.clients.length === 0 &&
            <CardPAClient
              title="Клиент"
              client={clientStore.client}
            >
              {props.isUpdateClient &&
                <Button
                  block
                  onClick={() => handlerUpdateClient(clientStore.client!)}
                  style={{ marginBottom: "10px" }}
                >
                  Изменить
                </Button>
              }
              {props.isDeleteClient &&
                <Button
                  block
                  onClick={handlerDeleteClient}
                >
                  Удалить
                </Button>
              }
            </CardPAClient>
          }
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {clientStore.clients.filter((client: IClient, index: number) => {
              return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
            }).map((client: IClient) =>
              <CardPAClient
                title="Клиент"
                client={client}
              />
            )}
          </Space>
          {clientStore.clients.length !== 0 &&
            <Pagination
              current={page}
              pageSize={pageSize}
              onChange={setPage}
              style={{ marginTop: "30px" }}
              total={clientStore.clients.length || 0}
            />
          }

          {notificationsStore?.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore?.isDeleteClient &&
            <ResultSuccess title="Клиент был успешно удалён" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ClientFind;