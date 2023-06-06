import { useForm } from "antd/es/form/Form";
import { AxiosError } from "axios";
import { IClientCreate } from "../../../options/model/client.model";
import ClientServices from "../../../services/client.service";
import FormClientAddBase from "../../Forms/FormClientAddBase";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface FormAddClientProps {
  notificationsStore?: NotificationsPAStoreClass,
}


const FormClientAdd = ({ notificationsStore }: FormAddClientProps) => {
  const [form] = useForm();


  const onFinish = async (client: IClientCreate) => {
    notificationsStore?.deleteNotificationsClient();

    const correctValue: IClientCreate = {
      ...client,
      "email": client["email"]?.length ? client["email"] : undefined,
    }

    await ClientServices.createClient(correctValue)
      .then(() => {
        notificationsStore?.setIsCreateClient(true);
        form.resetFields();
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 409) {
          notificationsStore?.setIsConflictClient(true);
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    notificationsStore?.deleteNotificationsClient();
    console.log("Failed:", errorInfo);
  }


  return (
    <FormClientAddBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
}


export default FormClientAdd;