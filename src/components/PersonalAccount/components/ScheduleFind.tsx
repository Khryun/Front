import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Col, Pagination, Row, Space } from "antd";
import { IScheduleControl, IScheduleControlFind, IScheduleControlUpdate } from "../../../options/model/schedule.model";
import dayjs from "dayjs";
import FormScheduleFind from "../forms/FormScheduleFind";
import ScheduleServices from "../../../services/schedule.service";
import ResultSuccessNoData from "../../Results/ResultSuccessNoData";
import ModalUpdateSchedule from "../modals/ModalUpdateSchedule";
import CardScheduleControl from "../cards/CardScheduleControl";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import ScheduleControlPAStoreClass from "../../../store/paStore/ScheduleControlPAStoreClass";


const pageSize: number = 6;
const employeeStore = new EmployeePAStoreClass();
const scheduleStore = new ScheduleControlPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

interface ScheduleFindProps {
  isChangeButton?: boolean,
}

interface fieldValue {
  date_work: dayjs.Dayjs,
  duration: { start_work: string, end_work: string },
  presence: boolean,
}


const ScheduleFind = observer((props: ScheduleFindProps) => {
  const [valuesForm, setValuesForm] = useState<IScheduleControlFind>();
  const [page, setPage] = useState<number>(1);
  const [form] = useForm();


  const onFinish = async (values: fieldValue) => {
    const correctValues: IScheduleControlUpdate = {
      "presence": values["presence"] !== undefined ? values["presence"] : scheduleStore.schedule!.presence,
      "date_work": values["date_work"]?.format("YYYY-MM-DD") ?? scheduleStore.schedule!.date_work,
      "start_work": values["duration"].start_work?.length ? values["duration"].start_work : scheduleStore.schedule!.start_work,
      "end_work": values["duration"].end_work?.length ? values["duration"].end_work : scheduleStore.schedule!.end_work,
    }

    await ScheduleServices.updateSchedule(scheduleStore.schedule!.schedule_id, correctValues);
    const schedule: IScheduleControl[] = await ScheduleServices.getScheduleControlByData(valuesForm!);
    scheduleStore.setScheduleList(schedule);
  }

  const handlerUpdateSchedule = (schedule: IScheduleControl) => {
    scheduleStore.setSchedule(schedule);
    ModalUpdateSchedule(form, schedule, onFinish);
  }

  const handlerDeleteSchedule = async (scheduleId: number) => {
    await ScheduleServices.deleteSchedule(scheduleId);
    const schedule: IScheduleControl[] = await ScheduleServices.getScheduleControlByData(valuesForm!);
    scheduleStore.setScheduleList(schedule);
  }


  useEffect(() => {
    return () => {
      employeeStore.deleteEmployee();
      scheduleStore.deleteSchedule();
      scheduleStore.deleteScheduleList();
      notificationsStore.deleteNotificationsSchedule();
    }
  }, [])


  return (
    <div className="schedule_find">
      <h2 className="schedule_find_title title--border"> Посмотреть расписание </h2>
      <Row
        justify={'space-between'}
        className="schedule_find_row"
      >
        <Col
          className="schedule_find_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormScheduleFind
            employeeStore={employeeStore}
            scheduleStore={scheduleStore}
            notificationsStore={notificationsStore}
            setValuesForm={setValuesForm}
          />
        </Col>
        <Col
          className="schedule_cards"
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {scheduleStore.scheduleList.filter((schedule: IScheduleControl, index: number) => {
              return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
            }).map((schedule: IScheduleControl) =>
              <CardScheduleControl
                schedule={schedule}
                key={schedule.schedule_id}
              >
                {props.isChangeButton &&
                  <>
                    <Button
                      block
                      onClick={() => handlerUpdateSchedule(schedule)}
                      style={{ marginBottom: "10px", marginTop: "20px" }}
                    >
                      Изменить
                    </Button>
                    <Button
                      block
                      onClick={() => handlerDeleteSchedule(schedule.schedule_id)}
                    >
                      Удалить
                    </Button>
                  </>
                }
              </CardScheduleControl>
            )}
          </Space>
          {scheduleStore.scheduleList.length !== 0 &&
            <Pagination
              current={page}
              pageSize={pageSize}
              onChange={setPage}
              style={{ marginTop: "30px" }}
              total={scheduleStore.scheduleList.length || 0}
            />
          }

          {notificationsStore.isNotFindSchedule &&
            <ResultSuccessNoData title="Расписаний не было найдено" subTitle="" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ScheduleFind;