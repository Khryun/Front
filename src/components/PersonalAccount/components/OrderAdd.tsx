import '../../../style/css/order/order.css';
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useEffect } from "react";
import ListDates from "../../OrderComponents/ListDates";
import OrderDetails from "../../OrderComponents/OrderDetails";
import ListServices from "../../OrderComponents/ListServices";
import ResultSuccess from "../../Results/ResultSuccess";
import FindClientForm from "../forms/FormClientFind";
import ListSpecialists from "../../OrderComponents/ListSpecialists";
import EnrollStoreClass from "../../../store/enrollStore/EnrollStoreClass";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import ListEstablishments from "../../OrderComponents/ListEstablishments";
import ServicesStoreClass from "../../../store/ServicesStoreClass";
import SpecialistsPAStoreClass from "../../../store/paStore/SpecialistsPAStoreClass";
import OrderDetailsStoreClass from "../../../store/enrollStore/OrderDetailsStoreClass";
import ScheduleOrderStoreClass from "../../../store/enrollStore/ScheduleOrderStoreClass";
import EstablishmentPAStoreClass from "../../../store/paStore/EstablishmentsPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


const enrollStore = new EnrollStoreClass();
const clientStore = new ClientPAStoreClass();
const servicesStore = new ServicesStoreClass();
const scheduleStore = new ScheduleOrderStoreClass();
const specialistsStore = new SpecialistsPAStoreClass();
const orderDetailsStore = new OrderDetailsStoreClass();
const establishmentStore = new EstablishmentPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();


const OrderAdd = observer(() => {
  useEffect(() => {
    return () => {
      enrollStore.clearStore();
      servicesStore.deleteServicesList();
      scheduleStore.deleteScheduleList();
      specialistsStore.deleteSpecialistsList();
      orderDetailsStore.clearStore();
      establishmentStore.deleteEstablishmentsList();
      clientStore.deleteClient();
      notificationsStore.deleteNotificationsClient();
      notificationsStore.deleteNotificationsChecks();
      notificationsStore.deleteIsSubmitOrder();
    }
  }, [])
  
  return (
    <div className="personal_account_forms_order">
      <h2 className="personal_account_forms_order_title title--border"> Добавить заказ </h2>
      <Row
        className="personal_account_forms_order_row"
        justify={'space-between'}
        wrap={false}
      >
        {enrollStore.isOpenFormFindClient
          ? <Col className="order_form" span={6}>
            <FindClientForm
              notificationsStore={notificationsStore}
              clientStore={clientStore}
            />
          </Col>
          : <Col className="order_lists" span={16}>
            {enrollStore.isOpenListEstablishment &&
              <ListEstablishments
                establishmentStore={establishmentStore}
                orderDetailsStore={orderDetailsStore}
              />
            }
            {enrollStore.isOpenListSpecialist &&
              <ListSpecialists
                specialistsStore={specialistsStore}
                orderDetailsStore={orderDetailsStore}
              />
            }
            {enrollStore.isOpenListServices &&
              <ListServices
                servicesStore={servicesStore}
                orderDetailsStore={orderDetailsStore}
              />
            }
            {enrollStore.isOpenListDate &&
              <ListDates
                scheduleStore={scheduleStore}
                orderDetailsStore={orderDetailsStore}
              />
            }
            {enrollStore.isSubmitOrder &&
              <Col className="order_message">
                Нажмите кнопку <span>Записаться</span> , чтобы создать запись в нашу парикмахерскую.
              </Col>
            }
          </Col>
        }

        <Col className="order_check" span={8}>
          {clientStore.client &&
            <OrderDetails
              enrollStore={enrollStore}
              clientStore={clientStore}
              servicesStore={servicesStore}
              scheduleStore={scheduleStore}
              specialistsStore={specialistsStore}
              orderDetailsStore={orderDetailsStore}
              establishmentStore={establishmentStore}
              notificationsStore={notificationsStore}
            />
          }
          {notificationsStore?.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore?.isSubmitOrder &&
            <ResultSuccess title="Запись успешно произведена" />
          }
        </Col>
      </Row>
    </div>
  )
})


export default OrderAdd;