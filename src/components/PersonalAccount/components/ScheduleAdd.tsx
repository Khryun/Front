import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useEffect } from "react";
import ResultSuccess from "../../Results/ResultSuccess";
import FormScheduleAdd from "../forms/FormScheduleAdd";
import ResultErrorConflict from "../../Results/ResultErrorConflict";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


const notificationsStore = new NotificationsPAStoreClass();


const ScheduleAdd = observer(() => {
  useEffect(() => {
    return () => {
      notificationsStore.deleteNotificationsSchedule();
    }
  }, [])

  return (
    <div className="schedule_add">
      <h2 className="schedule_add_title title--border"> Добавить расписание </h2>
      <Row
        justify={'space-between'}
        className="schedule_add_row"
      >
        <Col
          className="schedule_add_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormScheduleAdd notificationsStore={notificationsStore} />
        </Col>
        <Col className="schedule_add_result" span={18}>
          {notificationsStore?.isCreateSchedule &&
            <ResultSuccess title="Расписание успешно создано!" />
          }
          {notificationsStore?.isConflictSchedule &&
            <ResultErrorConflict title="Расписание уже сделано на этот день!" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ScheduleAdd;