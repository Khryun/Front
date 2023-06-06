import '../../../style/css/forms/formOrderFind.css';
import { useForm } from "antd/es/form/Form";
import { ICheck, ICheckFind } from "../../../options/model/check.model";
import dayjs from "dayjs";
import ButtonStep from "../../Buttons/ButtonStep";
import CheckServices from "../../../services/check.service";
import FormOrderFindBase from "../../Forms/FormOrderFindBase";
import CheckPAStoreClass from "../../../store/paStore/CheckPAStoreClass";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface fieldValue {
  date: dayjs.Dayjs,
  paid: boolean | undefined
}

interface FormFindOrderProps {
  checkStore: CheckPAStoreClass,
  clientStore: ClientPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const FormOrderFind = ({ clientStore, notificationsStore, checkStore }: FormFindOrderProps) => {
  const [form] = useForm();


  const cancelClient = async () => {
    checkStore.deleteChecks();
    checkStore.deleteChecksChoiceDate();
    checkStore.deleteChecksRadioPaid();
    clientStore.deleteClient();
    notificationsStore?.deleteNotificationsChecks();
  }


  const onFinish = async (values: fieldValue) => {
    checkStore.deleteChecks();
    const correctValues: ICheckFind = {
      ...values,
      "paid": values["paid"] !== undefined ? values["paid"] : undefined,
      "date": values["date"]?.format("YYYY-MM-DD"),
    }

    checkStore.setChecksChoiceDate(correctValues.date);
    checkStore.setChecksRadioIsPaid(correctValues.paid);
    notificationsStore?.deleteNotificationsChecks();


    await CheckServices.getChecksByClientId(clientStore.client!.client_id, correctValues)
      .then((checks: ICheck[]) => {
        if (checks.length) {
          checkStore.setChecks(checks);
        } else {
          notificationsStore?.setIsEmptyChecks(true);
        }
        // form.resetFields();
      })
      .catch(() => {
        notificationsStore?.setIsNotFindChecks(true);
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    notificationsStore?.deleteNotificationsChecks();
    console.log("Failed:", errorInfo);
  }


  return (
    <FormOrderFindBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      buttons={<ButtonStep block onClick={cancelClient}> Назад </ButtonStep>}
    >
      <div className="client_info" style={{ textAlign: "left" }}>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> ФИО </h3>
          <p className="client_info_inner_fullname"> {clientStore.client!.full_name} </p>
        </div>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> Номер телефона </h3>
          <p className="client_info_inner_telephone"> {clientStore.client!.telephone} </p>
        </div>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> Бонусы </h3>
          <p className="client_info_inner_bonus"> {clientStore.client!.bonus} </p>
        </div>
      </div>
    </FormOrderFindBase>
  )
};


export default FormOrderFind;