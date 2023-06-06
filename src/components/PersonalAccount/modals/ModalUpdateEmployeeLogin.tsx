import { FormInstance, Modal } from "antd";
import { IEmployeeLoginUpdate } from "../../../options/model/employeeLogin.model";
import FormEmployeeLoginUpdateBase from "../../Forms/FormEmployeeLoginUpdateBase";


const ModalUpdateEmployee = (
  form: FormInstance<any>,
  employee: IEmployeeLoginUpdate,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void
) => {
  Modal.confirm({
    className: "modal_update_employee",
    icon: null,
    centered: true,
    okText: "Изменить",
    cancelText: "Назад",
    content: (
      <FormEmployeeLoginUpdateBase
        form={form}
        employee={employee}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    ),
    async onOk() {
      form.submit();
    }
  });
};


export default ModalUpdateEmployee;