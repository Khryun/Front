import { IClientUpdate } from "../../../options/model/client.model";
import { FormInstance, Modal } from "antd";
import FormPeopleUpdateBase from "../../Forms/FormPeopleUpdateBase";


const ModalUpdateClient = (
  form: FormInstance<any>,
  client: IClientUpdate,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void
) => {
  Modal.confirm({
    className: "modal_update_client",
    icon: null,
    centered: true,
    okText: "Изменить",
    cancelText: "Назад",
    content: (
      <FormPeopleUpdateBase
        form={form}
        defaultPeopleInfo={client}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    ),
    async onOk() {
      form.submit();
    }
  });
};


export default ModalUpdateClient;