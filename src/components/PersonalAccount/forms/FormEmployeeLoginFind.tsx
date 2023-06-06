import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { IEmployee } from "../../../options/model/employee.model";
import EmployeeServices from "../../../services/employee.service";
import FormPeopleFindBase from "../../Forms/FormPeopleFindBase";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import EmployeeLoginServices from "../../../services/employeeLogin.service";
import { IEmployeeLogin } from "../../../options/model/employeeLogin.model";


interface FindEmployeeLoginFormProps {
  employeeStore: EmployeePAStoreClass,
  notificationsStore: NotificationsPAStoreClass,
}

interface FormValue {
  telephone: string,
}


const FormEmployeeLoginFind = observer(({ employeeStore, notificationsStore }: FindEmployeeLoginFormProps) => {
  const [form] = useForm();


  const clearNotifications = () => {
    notificationsStore.deleteNotificationsEmployee();
  }


  const onFinish = async (value: FormValue) => {
    employeeStore.deleteEmployeeLogin();
    employeeStore.deleteEmployeesLogin();
    notificationsStore.deleteNotificationsEmployee();

    await EmployeeLoginServices.getEmployeeLoginByTelephone(value.telephone)
      .then((employee: IEmployeeLogin) => {
        employeeStore.setEmployeeLogin(employee);
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
    clearNotifications();
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


export default FormEmployeeLoginFind;