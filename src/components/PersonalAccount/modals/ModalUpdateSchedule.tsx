import { Modal } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { IScheduleControlUpdate } from "../../../options/model/schedule.model";
import FormScheduleUpdateBase from "../../Forms/FormScheduleUpdateBase";


const ModalUpdateSchedule = (
  form: FormInstance<any>,
  schedule: IScheduleControlUpdate,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void
) => {
  Modal.confirm({
    className: "modal_update_schedule",
    icon: null,
    centered: true,
    okText: "Изменить",
    cancelText: "Назад",
    content: (
      <FormScheduleUpdateBase
        form={form}
        schedule={schedule}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    ),
    async onOk() {
      form.submit();
    }
  });
};


export default ModalUpdateSchedule;