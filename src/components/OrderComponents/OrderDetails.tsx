import '../../style/css/order/orderDetails.css';
import { observer } from "mobx-react";
import { IService } from "../../options/model/service.model";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";
import { Card, Row, Col, Button, Space } from "antd";
import ButtonStep from "../Buttons/ButtonStep";
import CheckServices from "../../services/check.service";
import EnrollStoreClass from "../../store/enrollStore/EnrollStoreClass";
import ClientPAStoreClass from "../../store/paStore/ClientPAStoreClass";
import ServicesStoreClass from "../../store/ServicesStoreClass";
import OrderDetailsStoreClass from "../../store/enrollStore/OrderDetailsStoreClass";
import SpecialistsPAStoreClass from "../../store/paStore/SpecialistsPAStoreClass";
import ScheduleOrderStoreClass from "../../store/enrollStore/ScheduleOrderStoreClass";
import EstablishmentPAStoreClass from "../../store/paStore/EstablishmentsPAStoreClass";
import NotificationsPAStoreClass from "../../store/paStore/NotificationsPAStoreClass";


interface OrderDetailsProps {
  enrollStore: EnrollStoreClass;
  clientStore: ClientPAStoreClass,
  servicesStore: ServicesStoreClass,
  scheduleStore: ScheduleOrderStoreClass,
  specialistsStore: SpecialistsPAStoreClass,
  orderDetailsStore: OrderDetailsStoreClass,
  establishmentStore: EstablishmentPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const OrderDetails = observer((props: OrderDetailsProps) => {

  const clearOrderComponent = () => {
    props.enrollStore.clearStore();
    props.orderDetailsStore.clearStore();

    props.establishmentStore.deleteEstablishmentsList();
    props.specialistsStore.deleteSpecialistsList();
    props.servicesStore.deleteServicesList();
    props.scheduleStore.deleteScheduleList();
  }


  const selectedClient = async () => {
    props.orderDetailsStore.setOrderDetailsClient(props.clientStore?.client);
    props.enrollStore.setSelectButtonClientIsClicked(true);
    props.enrollStore.setIsOpenFormFindClient(false);
    props.enrollStore.setIsOpenListEstablishment(true);
  }

  const cancelClient = () => {
    props.enrollStore.setSelectButtonClientIsClicked(false);
    props.enrollStore.setIsOpenListEstablishment(false);
    props.enrollStore.setIsOpenFormFindClient(true);
    props.establishmentStore.deleteEstablishmentsList();
  }

  const selectedEstablishment = async () => {
    props.enrollStore.setSelectButtonEstablishmentIsClicked(true);
    props.enrollStore.setIsOpenListEstablishment(false);
    props.enrollStore.setIsOpenListSpecialist(true);
  }

  const cancelEstablishment = () => {
    props.establishmentStore.deleteEstablishmentsList();

    props.enrollStore.setSelectButtonEstablishmentIsClicked(false);
    props.enrollStore.setIsOpenListSpecialist(false);
    props.enrollStore.setIsOpenListEstablishment(true);
    props.specialistsStore.deleteSpecialistsList();
  }

  const selectedSpecialist = async () => {
    props.enrollStore.setSelectButtonSpecialistIsClicked(true);
    props.enrollStore.setIsOpenListSpecialist(false);
    props.enrollStore.setIsOpenListServices(true);
  }

  const cancelSpecialist = () => {
    props.specialistsStore.deleteSpecialistsList();

    props.enrollStore.setSelectButtonSpecialistIsClicked(false);
    props.enrollStore.setIsOpenListServices(false);
    props.enrollStore.setIsOpenListSpecialist(true);
    props.servicesStore.deleteServicesList();
  }

  const selectedServices = async () => {
    props.enrollStore.setSelectButtonServicesIsClicked(true);
    props.enrollStore.setIsOpenListServices(false);
    props.enrollStore.setIsOpenListDate(true);
  }

  const cancelServices = () => {
    props.servicesStore.deleteServicesList()

    props.enrollStore.setSelectButtonServicesIsClicked(false);
    props.enrollStore.setIsOpenListDate(false);
    props.enrollStore.setIsOpenListServices(true);
    props.scheduleStore.deleteScheduleList();
  }

  const selectedDate = async () => {
    props.enrollStore.setSelectButtonDateIsClicked(true);
    props.enrollStore.setIsOpenListDate(false);
    props.enrollStore.setIsSubmitOrder(true);
  }

  const cancelDate = () => {
    props.scheduleStore.deleteScheduleList();

    props.enrollStore.setSelectButtonDateIsClicked(false);
    props.enrollStore.setIsOpenListDate(true);
    props.enrollStore.setIsSubmitOrder(false);
  }


  const onClickSubmit = async () => {
    await CheckServices.createCheck(props.orderDetailsStore.getOrderDetails());
    props.clientStore?.deleteClient();
    props.notificationsStore?.setIsSubmitOrder(true);
    clearOrderComponent();
  }

  const onClickClearAll = () => {
    clearOrderComponent();
  }


  return (
    <Card
      className="order_check_details"
      title="Детали записи"
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      {props.clientStore?.client
        ? <div className="order_check_details_client">
          <h3 className="order_check_details_client_title"> Клиент </h3>
          <div className="order_check_details_client_fullname"> {props.clientStore.client.full_name} </div>
          <div className="order_check_details_client_telephone"> {props.clientStore.client.telephone} </div>
        </div>
        : <div className="order_check_details_message"> Ожидаем ваш заказ! </div>
      }

      {props.orderDetailsStore.OrderDetailsEstablishment &&
        <div className="order_check_details_establishment">
          <h3 className="order_check_details_establishment_title"> Адрес </h3>
          <div className="order_check_details_establishment_address">
            {props.orderDetailsStore.OrderDetailsEstablishment?.address_establishment}
          </div>
        </div>
      }

      {props.orderDetailsStore.OrderDetailsSpecialist &&
        <div className="order_check_details_specialist">
          <h3 className="order_check_details_specialist_title"> Специалист </h3>
          <div className="order_check_details_specialist_fullname">
            {props.orderDetailsStore.OrderDetailsSpecialist?.full_name}
          </div>
        </div>
      }

      {props.orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <div className="order_check_details_services">
          {props.orderDetailsStore.OrderDetailsServices.map((service: IService) =>
            <Row
              justify={'space-between'}
              wrap={false}
              className="order_check_details_service"
              key={service.service_id}
            >
              <Col className="order_check_details_service_info">
                <div className="order_check_details_service_info_name"> {service.name_service} </div>
              </Col>
              <Col className="order_check_details_info">
                <div className="order_check_details_info_cost"> {service.cost} руб. </div>
              </Col>
            </Row>
          )}
        </div>
      }

      {props.orderDetailsStore.OrderDetailsDate && props.orderDetailsStore.OrderDetailsTime &&
        <Row justify={'space-between'} className="order_check_details_datetime">
          <Col className="order_check_details_date">
            {new Date(props.orderDetailsStore.OrderDetailsDate).toLocaleDateString()}
          </Col>
          <Col className="order_check_details_time">
            {props.orderDetailsStore.OrderDetailsTime} — {props.orderDetailsStore.getOrderDetailsTotalTime}
          </Col>
        </Row>
      }

      {props.orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <Row justify={'space-between'} className="order_check_details_totalcount">
          <Col className="order_check_details_totalcount_text"> Стоимость </Col>
          <Col className="order_check_details_totalcount_sum">
            {props.orderDetailsStore.getOrderDetailsTotalCount} руб.
          </Col>
        </Row>
      }

      <Space
        direction="vertical"
        className="order_check_details_buttons"
        style={{ width: "100%", justifyContent: "center" }}
      >
        {/* <div className="order_check_details_buttons_step"> */}
        {/* Кнопка после клиента */}
        {props.clientStore?.client && !props.enrollStore.selectButtonClientIsClicked &&
          <ButtonStep block onClick={selectedClient}> Далее </ButtonStep>
        }
        {props.enrollStore.selectButtonClientIsClicked && !props.orderDetailsStore.OrderDetailsEstablishment &&
          <ButtonStep block onClick={cancelClient}> Назад </ButtonStep>
        }

        {/* Кнопка после заведения */}
        {props.orderDetailsStore.OrderDetailsEstablishment && !props.enrollStore.selectButtonEstablishmentIsClicked &&
          <ButtonStep block onClick={selectedEstablishment}> Далее </ButtonStep>
        }
        {props.enrollStore.selectButtonEstablishmentIsClicked && !props.orderDetailsStore.OrderDetailsSpecialist &&
          <ButtonStep block onClick={cancelEstablishment}> Назад </ButtonStep>
        }

        {/* Кнопка после специалиста */}
        {props.orderDetailsStore.OrderDetailsSpecialist && !props.enrollStore.selectButtonSpecialistIsClicked &&
          <ButtonStep block onClick={selectedSpecialist}> Далее </ButtonStep>
        }
        {props.enrollStore.selectButtonSpecialistIsClicked && props.orderDetailsStore.OrderDetailsServices.length === 0 &&
          <ButtonStep block onClick={cancelSpecialist}> Назад </ButtonStep>
        }

        {/* Кнопка после услуг */}
        {props.orderDetailsStore.OrderDetailsServices.length !== 0 && !props.enrollStore.selectButtonServicesIsClicked &&
          <ButtonStep block onClick={selectedServices}> Далее </ButtonStep>
        }
        {props.enrollStore.selectButtonServicesIsClicked && !props.orderDetailsStore.OrderDetailsDate &&
          <ButtonStep block onClick={cancelServices}> Назад </ButtonStep>
        }

        {/* Кнопка после даты */}
        {props.orderDetailsStore.OrderDetailsDate && !props.enrollStore.selectButtonDateIsClicked &&
          <ButtonStep block onClick={selectedDate}> Далее </ButtonStep>
        }
        {props.enrollStore.selectButtonDateIsClicked &&
          <ButtonStep block onClick={cancelDate}> Назад </ButtonStep>
        }
        {/* </div> */}

        {/* Кнопки очистки и submit */}
        {props.orderDetailsStore.OrderDetailsEstablishment &&
          <Button
            className="order_check_details_clear_button"
            block
            danger
            onClick={onClickClearAll}
          >
            Всё очистить
          </Button>
        }
        {props.enrollStore.selectButtonDateIsClicked &&
          <Button
            className="order_check_details_submit_button"
            block
            type="primary"
            onClick={onClickSubmit}
          >
            Записаться
          </Button>
        }
      </Space>
    </Card >
  )
});


export default OrderDetails;