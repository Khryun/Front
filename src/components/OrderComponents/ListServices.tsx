import '../../style/css/order/listServices.css';
import { observer } from "mobx-react";
import { IService } from "../../options/model/service.model";
import { List, Button, Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { ClockCircleOutlined, DeleteOutlined, DollarCircleOutlined } from "@ant-design/icons";
import ServicesStoreClass from "../../store/ServicesStoreClass";
import OrderDetailsStoreClass from "../../store/enrollStore/OrderDetailsStoreClass";


const selectorListServices: string = ".enroll_list_services";
const selectorDeleteButton: string = ".enroll_list_services_item_meta_button_delete";
const selectorAddButton: string = ".enroll_list_services_item_meta_button_add";

interface ListServicesProps {
  servicesStore: ServicesStoreClass,
  orderDetailsStore: OrderDetailsStoreClass,
}


const ListServices = observer(({ servicesStore, orderDetailsStore }: ListServicesProps) => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const useListServices = useRef<Element | null>(null);
  const useListDeleteButtons = useRef<NodeListOf<Element> | null>(null);
  const useListAddButtons = useRef<NodeListOf<Element> | null>(null);


  const loadingPage = async () => {
    await servicesStore.getServicesListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist!.employee_id)
      .then(() => {
        setIsLoader(true);
      })
    //Обработка ошибки
  }


  const onClickClearChoice = () => {
    if (servicesStore.ServicesList.length) {
      orderDetailsStore.deleteOrderDetailsServices();
      Array.from(useListDeleteButtons.current!).forEach((el: any) => el.style.display = "none");
      Array.from(useListAddButtons.current!).forEach((el: any) => el.style.display = "inline-block");
    }
  }

  const onClickAddService = (e: any, service: IService) => {
    const button = e.target.closest(selectorAddButton);

    button.style.display = "none";
    button.nextElementSibling.style.display = "inline-block";
    orderDetailsStore.addOrderDetailsService(service);
  }

  const onClickDeleteService = (e: any, service: IService) => {
    const button = e.target.closest(selectorDeleteButton);

    button.style.display = "none";
    button.previousElementSibling.style.display = "inline-block";
    orderDetailsStore.deleteOrderDetailsService(service.service_id);
  }


  useEffect(() => {
    const getLists = () => {
      useListServices.current = document.querySelector(selectorListServices);
      useListDeleteButtons.current = useListServices.current!.querySelectorAll(selectorDeleteButton);
      useListAddButtons.current = useListServices.current!.querySelectorAll(selectorAddButton);
    }

    const returnChoice = () => {
      const ListItems = useListServices.current!.querySelectorAll(".enroll_list_services_item");
      Array.from(ListItems).forEach((el: any) => {
        if (orderDetailsStore.OrderDetailsServices.length) {
          orderDetailsStore.OrderDetailsServices.every((service: IService) => {
            if (el.getAttribute("data-id") == service.service_id) {
              const addButton = el.querySelector(selectorAddButton);
              addButton.style.display = "none";
              addButton.nextElementSibling.style.display = "inline-block";
              return false;
            }

            return true;
          })
        }
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
    <List
      className="enroll_list_services"
      itemLayout="horizontal"
      bordered
      loading={!servicesStore.ServicesList.length}
      header={
        <Row
          justify={'space-between'}
          wrap={false}
          className="enroll_list_services_header"
        >
          <Col></Col>
          <Col className="enroll_list_services_header_title"> Список услуг </Col>
          <Col className="enroll_list_services_header_buttons">
            <Button
              className="enroll_list_services_header_button"
              onClick={onClickClearChoice}
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      }
    >
      {servicesStore.ServicesList.map((service: IService) =>
        <List.Item
          className="enroll_list_services_item"
          key={service.service_id}
          data-id={service.service_id}>
          <List.Item.Meta
            className="enroll_list_services_item_meta"
            title={service.name_service}
            description={
              <Row
                wrap={false}
                justify={'space-between'}
                align={'middle'}
                className="enroll_list_services_item_meta_row">
                <Col className="enroll_list_services_item_meta_info">
                  <p className="enroll_list_services_item_meta_info_duration"> <ClockCircleOutlined /> {service.duration} мин. </p>
                  <p className="enroll_list_services_item_meta_info_cost"> <DollarCircleOutlined /> {service.cost} руб. </p>
                </Col>
                <Col className="enroll_list_services_item_meta_buttons">
                  <Button
                    className="enroll_list_services_item_meta_button_add button_text--center button--black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, service)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_services_item_meta_button_delete button_text--center button--white"
                    shape="circle"
                    onClick={(e) => onClickDeleteService(e, service)}>
                    -
                  </Button>
                </Col>
              </Row>
            }
          />
        </List.Item>
      )}
    </List>
  )
});


export default ListServices;