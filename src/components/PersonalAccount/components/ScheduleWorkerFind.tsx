import { observer } from "mobx-react";
import { IScheduleWorker } from "../../../options/model/schedule.model";
import { Pagination, Space } from "antd";
import { useEffect, useState } from "react";
import CardScheduleWorker from "../cards/CardScheduleWorker";
import ScheduleWorkerPAStoreClass from "../../../store/paStore/ScheduleWorkerPAStoreClass";


const pageSize: number = 10;
const scheduleStore = new ScheduleWorkerPAStoreClass();


const ScheduleWorkerFind = observer(() => {
  const [page, setPage] = useState<number>(1);


  useEffect(() => {
    scheduleStore.getSchedule()
    return () => {
      scheduleStore.deleteSchedule();
      scheduleStore.deleteSchedule();
    }
  }, [])


  return (
    <div className="scheduleworker_find">
      <h2 className="scheduleworker_title title--border"> Моё расписание </h2>
      <Space
        wrap={true}
        direction="horizontal"
        align="start"
        size={[20, 20]}
        style={{ width: "100%" }}
      >
        {scheduleStore.schedule.filter((schedule: IScheduleWorker, index: number) => {
          return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
        }).map((schedule: IScheduleWorker) =>
          <CardScheduleWorker schedule={schedule} />
        )}
      </Space>
      {scheduleStore.schedule.length !== 0 &&
        <Pagination
          current={page}
          pageSize={pageSize}
          onChange={setPage}
          style={{ marginTop: "30px" }}
          total={scheduleStore.schedule.length || 0}
        />
      }
    </div>
  )
});


export default ScheduleWorkerFind;