import '../../../style/css/forms/formScheduleFind.css';
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { IScheduleControl, IScheduleControlFind } from "../../../options/model/schedule.model";
import dayjs from "dayjs";
import ScheduleServices from "../../../services/schedule.service";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import FormScheduleFindBase from "../../Forms/FormScheduleFindBase";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import ScheduleControlPAStoreClass from "../../../store/paStore/ScheduleControlPAStoreClass";


interface fieldValue {
  telephone: string,
  presence: boolean,
  date_work: dayjs.Dayjs,
}

interface FindScheduleFormProps {
  employeeStore: EmployeePAStoreClass,
  scheduleStore: ScheduleControlPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
  setValuesForm?: (values: IScheduleControlFind) => void,
}


const FormScheduleFind = observer(({ employeeStore, notificationsStore, scheduleStore, ...props }: FindScheduleFormProps) => {
  const [form] = useForm();


  const clearNotifications = () => {
    notificationsStore!.deleteNotificationsSchedule();
  }

  const onFinish = async (values: fieldValue) => {
    scheduleStore.deleteScheduleList();
    const correctValues: IScheduleControlFind = {
      ...values,
      "date_work": values["date_work"]?.format("YYYY-MM-DD"),
      "presence": values["presence"] !== undefined ? values["presence"] : undefined,
      "telephone": values["telephone"]?.length ? values["telephone"] : undefined,
    };

    if (props.setValuesForm) {
      props.setValuesForm(correctValues);
    }
    
    if (notificationsStore) {
      clearNotifications();
    }

    await ScheduleServices.getScheduleControlByData(correctValues)
      .then((schedule: IScheduleControl[]) => {
        if (!schedule.length) {
          notificationsStore?.setIsNotFindSchedule(true);
        }
        scheduleStore.setScheduleList(schedule);
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    if (notificationsStore) {
      clearNotifications();
    }
    console.log("Failed:", errorInfo);
  }


  return (
    <FormScheduleFindBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
});


export default FormScheduleFind;