import { IEmployeeUpdate } from "../../../options/model/employee.model";
import { FormInstance, Modal } from "antd";
import FormEmployeeUpdateBase from "../../Forms/FormEmployeeUpdateBase";


const ModalUpdateEmployee = (
  form: FormInstance<any>,
  employee: IEmployeeUpdate,
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
      <FormEmployeeUpdateBase
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