import { useForm } from "antd/es/form/Form";
import { AxiosError } from "axios";
import { IEmployeeCreate } from "../../../options/model/employee.model";
import EmployeeServices from "../../../services/employee.service";
import FormEmployeeAddBase from "../../Forms/FormEmployeeAddBase";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface FormEmployeeAddProps {
  notificationsStore?: NotificationsPAStoreClass,
}


const FormEmployeeAdd = ({ notificationsStore }: FormEmployeeAddProps) => {
  const [form] = useForm();


  const onFinish = async (employee: IEmployeeCreate) => {
    notificationsStore?.deleteNotificationsEmployee();

    const correctValue: IEmployeeCreate = {
      ...employee,
      "email": employee["email"]?.length ? employee["email"] : undefined,
    }

    await EmployeeServices.createEmployee(correctValue)
      .then(() => {
        notificationsStore?.setIsCreateEmployee(true);
        form.resetFields();
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 409) {
          notificationsStore?.setIsConflictEmployee(true);
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    notificationsStore?.deleteNotificationsSchedule();
    console.log("Failed:", errorInfo);
  }


  return (
    <FormEmployeeAddBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
}


export default FormEmployeeAdd;