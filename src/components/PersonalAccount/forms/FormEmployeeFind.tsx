import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { IEmployee } from "../../../options/model/employee.model";
import EmployeeServices from "../../../services/employee.service";
import FormPeopleFindBase from "../../Forms/FormPeopleFindBase";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface FindEmployeeFormProps {
  employeeStore: EmployeePAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}

interface FormValue {
  telephone: string,
}


const FormEmployeeFind = observer(({ employeeStore, notificationsStore }: FindEmployeeFormProps) => {
  const [form] = useForm();


  const clearNotifications = () => {
    notificationsStore!.deleteNotificationsEmployee();
  }


  const onFinish = async (value: FormValue) => {
    employeeStore.deleteEmployee();
    employeeStore.deleteEmployees();

    if (notificationsStore) {
      clearNotifications();
    }

    await EmployeeServices.getEmployeeByTelephone(value.telephone)
      .then((employee: IEmployee) => {
        employeeStore.setEmployee(employee);
        form.resetFields();
      })
      .catch((err) => {
        if (notificationsStore) {
          notificationsStore.setIsNotFindEmployee(true);
        }
        console.log(err);
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
      title="Найти сотрудника"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
});


export default FormEmployeeFind;