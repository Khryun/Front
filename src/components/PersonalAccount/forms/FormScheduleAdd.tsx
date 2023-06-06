import { useForm } from "antd/es/form/Form";
import { AxiosError } from "axios";
import { IScheduleControlCreate } from "../../../options/model/schedule.model";
import dayjs from "dayjs";
import ScheduleServices from "../../../services/schedule.service";
import FormScheduleAddBase from "../../Forms/FormScheduleAddBase";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface fieldValues {
  date_work: dayjs.Dayjs,
  duration: { start_work: string, end_work: string },
  // address_establishment: string,
  telephone: string,
}

interface FormScheduleAddProps {
  notificationsStore?: NotificationsPAStoreClass,
}


const FormScheduleAdd = ({ notificationsStore }: FormScheduleAddProps) => {
  const [form] = useForm();


  const onFinish = async (values: fieldValues) => {
    notificationsStore?.deleteNotificationsSchedule();
    const correctValues: IScheduleControlCreate = {
      "date_work": values["date_work"]!.format("YYYY-MM-DD"),
      "telephone": values["telephone"]!,
      "start_work": values["duration"].start_work,
      "end_work": values["duration"].end_work,
    };

    console.log(correctValues);

    await ScheduleServices.createSchedule(correctValues)
      .then(() => {
        notificationsStore?.setIsCreateSchedule(true);
        form.resetFields();
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 409) {
          notificationsStore?.setIsConflictSchedule(true);
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    notificationsStore?.deleteNotificationsSchedule();
    console.log("Failed:", errorInfo);
  }


  return (
    <FormScheduleAddBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
}


export default FormScheduleAdd;