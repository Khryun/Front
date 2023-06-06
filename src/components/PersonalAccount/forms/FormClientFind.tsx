import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { IClient } from "../../../options/model/client.model";
import ClientServices from "../../../services/client.service";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import FormPeopleFindBase from "../../Forms/FormPeopleFindBase";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface FindClientFormProps {
  clientStore: ClientPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}

interface FormValues {
  telephone: string,
}


const FormClientFind = observer(({ clientStore, notificationsStore }: FindClientFormProps) => {
  const [form] = useForm();


  const clearNotifications = () => {
    notificationsStore!.deleteNotificationsClient();
    notificationsStore!.deleteIsSubmitOrder();
  }


  const onFinish = async (value: FormValues) => {
    clientStore.deleteClient();
    clientStore.deleteClients();

    if (notificationsStore) {
      clearNotifications();
    }

    await ClientServices.getClientByTelephone(value.telephone)
      .then((client: IClient) => {
        clientStore.setClient(client);
        form.resetFields();
      })
      .catch(() => {
        if (notificationsStore) {
          notificationsStore.setIsNotFindClient(true);
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    if (notificationsStore) {
      clearNotifications();
    }
    console.log("Failed:", errorInfo);
  }


  return (
    <FormPeopleFindBase
      form={form}
      title="Найти клиента"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
});


export default FormClientFind;