import '../../style/css/order/listDates.css';
import { observer } from "mobx-react";
import { CardForm } from "../../style/typescript/cardForm";
import { IScheduleSpecialist } from "../../options/model/schedule.model";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row, Space } from "antd";
import OrderDetailsStoreClass from "../../store/enrollStore/OrderDetailsStoreClass";
import ScheduleOrderStoreClass from "../../store/enrollStore/ScheduleOrderStoreClass";


const selectorListDatesTimes: string = ".enroll_list_dates_times";
const selectorDateButton: string = ".enroll_list_dates_item_button";
const selectorTimeButton: string = ".enroll_list_times_button";
const blackButton: string = "button--black";

interface ListDatesProps {
  scheduleStore: ScheduleOrderStoreClass,
  orderDetailsStore: OrderDetailsStoreClass,
}


const ListDates = observer(({scheduleStore, orderDetailsStore}: ListDatesProps) => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const useListDateTimes = useRef<Element | null>(null);
  const useListDateButtons = useRef<NodeListOf<Element> | null>(null);
  const useListTimeButtons = useRef<NodeListOf<Element> | null>(null);


  const loadingPage = async () => {
    await scheduleStore.getScheduleList({
      establishment_id: orderDetailsStore.OrderDetailsEstablishment!.establishment_id,
      employee_id: orderDetailsStore.OrderDetailsSpecialist!.employee_id,
      services_id: orderDetailsStore.getOrderDetailServicesId(),
    })
      .then(() => {
        setIsLoader(true);
      })
    //Обработка ошибки
  }


  const onlyOneButtonDateDisabled = () => {
    Array.from(useListDateButtons.current!).forEach((el: any) => el.classList.remove(blackButton));
  }

  const onlyOneButtonTimeDisabled = () => {
    useListTimeButtons.current = useListDateTimes.current!.querySelectorAll(selectorTimeButton);
    Array.from(useListTimeButtons.current!).forEach((el: any) => el.classList.remove(blackButton));
  }


  const onClickClearChoice = () => {
    if (scheduleStore.ScheduleList.length) {
      orderDetailsStore.deleteOrderDetailsTime();
      onlyOneButtonTimeDisabled();
      orderDetailsStore.deleteOrderDetailsDate();
      onlyOneButtonDateDisabled();
      orderDetailsStore.deleteOrderDetailsDateWithTimes();
    }
  }

  const onClickButtonDate = (e: any, schedule: IScheduleSpecialist) => {
    const button = e.target.closest(selectorDateButton);

    if (!button.classList.contains(blackButton)) {
      onlyOneButtonDateDisabled();
      button.classList.add(blackButton);

      orderDetailsStore.setOrderDetailsDate(schedule.date);
      orderDetailsStore.deleteOrderDetailsTime();
      orderDetailsStore.setOrderDetailsDateWithTimes(schedule);
    } else {
      button.classList.remove(blackButton);
      orderDetailsStore.deleteOrderDetailsDate();
      orderDetailsStore.setOrderDetailsDateWithTimes(undefined);
    }
  }


  const onClickButtonTime = (e: any, time: string) => {
    const button = e.target.closest(selectorTimeButton);

    if (!button.classList.contains(blackButton)) {
      onlyOneButtonTimeDisabled();
      button.classList.add(blackButton);
      orderDetailsStore.setOrderDetailsTime(time);
    } else {
      button.classList.remove(blackButton);
      orderDetailsStore.deleteOrderDetailsTime();
    }
  }


  useEffect(() => {
    const getLists = () => {
      useListDateTimes.current = document.querySelector(selectorListDatesTimes);
      useListDateButtons.current = useListDateTimes.current!.querySelectorAll(selectorDateButton);
      //Изначально Times нет, поэтому useListTimeButtons is Null
      useListTimeButtons.current = useListDateTimes.current!.querySelectorAll(selectorTimeButton);
    }

    const returnChoice = () => {
      Array.from(useListDateButtons.current!).every((el: any) => {
        if (el.getAttribute("data-id") == orderDetailsStore.OrderDetailsDate) {
          el.classList.add(blackButton);
          return false;
        }

        return true;
      });

      Array.from(useListTimeButtons.current!).every((el: any) => {
        if (el.getAttribute("data-id") == (orderDetailsStore.OrderDetailsTime! + orderDetailsStore.OrderDetailsDate!)) {
          el.classList.add(blackButton);
          return false;
        }

        return true;
      });
    }

    if (!isLoader) {
      loadingPage();
    } else {
      getLists();
      returnChoice();
    }
  }, [isLoader])


  return (
    <Card
      className="enroll_list_dates_times"
      style={CardForm}
      loading={!scheduleStore.ScheduleList.length}
      title={
        <Row
        justify={'space-between'}
          wrap={false}
          className="enroll_list_dates_times_header"
          >
          <Col></Col>
          <Col className="enroll_list_dates_times_header_title"> Список дат и времени </Col>
          <Col className="enroll_list_dates_times_header_buttons">
            <Button
              className="enroll_list_dates_times_header_button"
              onClick={onClickClearChoice}
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      }
    >
      {scheduleStore.ScheduleList.length !== 0 &&
        <div className="enroll_list_dates_items">
          {scheduleStore.ScheduleMonth.map((month: string) =>
            <div className="enroll_list_dates_item" key={month}>
              <div className="enroll_list_dates_item_month">
                {month.charAt(0).toUpperCase() + month.substring(1)}
              </div>
              <Space
                wrap={true}
                className="enroll_list_dates_item_buttons"
                direction="horizontal"
                size={[8, 8]}
              >
                {scheduleStore.ScheduleList.filter((schedule: IScheduleSpecialist) => {
                  return month === new Date(schedule.date).toLocaleString('ru', { month: 'long' });
                }).map((schedule: IScheduleSpecialist) =>
                  <Button
                    className="enroll_list_dates_item_button"
                    key={schedule.date}
                    data-id={schedule.date}
                    shape="circle"
                    onClick={(e) => onClickButtonDate(e, schedule)}
                  >
                    {new Date(schedule.date).getDate()}
                  </Button>
                )}
              </Space>
            </div>
          )}
        </div>
      }

      {orderDetailsStore.OrderDetailsDate &&
        <Space
          wrap={true}
          className="enroll_list_times_buttons"
          direction="horizontal"
          size={[8, 8]}
        >
          {orderDetailsStore.OrderDetailsDateWithTimes?.times.map((time: string) =>
            <Button
              className="enroll_list_times_button"
              key={time + orderDetailsStore.OrderDetailsDateWithTimes?.date}
              data-id={time + orderDetailsStore.OrderDetailsDateWithTimes?.date}
              onClick={(e) => onClickButtonTime(e, time)}
            >
              {time}
            </Button>
          )}
        </Space>
      }

    </Card >
  )
});


export default ListDates;