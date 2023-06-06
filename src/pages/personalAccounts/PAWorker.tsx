import '../../style/css/personal_account/paWorker.css';
import { observer } from "mobx-react";
import { SearchOutlined } from "@ant-design/icons";
import { IScheduleWorker } from "../../options/model/schedule.model";
import { useEffect, useState } from "react";
import { Button, Col, Pagination, Row, Space } from "antd";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import CardScheduleWorker from "../../components/PersonalAccount/cards/CardScheduleWorker";
import ScheduleWorkerPAStoreClass from "../../store/paStore/ScheduleWorkerPAStoreClass";


const pageSize: number = 10;
const scheduleStore = new ScheduleWorkerPAStoreClass();


const PAWorker = observer(() => {
  const [page, setPage] = useState<number>(1);


  const onClickFoundScheduleButton = async () => {
    await scheduleStore.getSchedule();
  }


  useEffect(() => {
    scheduleStore.getSchedule()
  }, [])


  return (
    <div className="personal_account_worker_page">
      <h1 className="personal_account_worker_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_worker_row">
        <Col className="personal_account_worker_info" span={4}>
          <CardPAUser />
          <Button
            className="personal_account_worker_info_button"
            block
            onClick={onClickFoundScheduleButton}
          >
            <SearchOutlined /> Посмотреть своё расписание
          </Button>
        </Col>

        <Col
          className="personal_account_worker_schedule"
          span={20}
        >
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
        </Col>
      </Row>
    </div>
  )
});


export default PAWorker;