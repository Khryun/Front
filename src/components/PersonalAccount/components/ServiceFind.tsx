import { observer } from "mobx-react";
import { IService } from "../../../options/model/service.model";
import { useEffect } from "react";
import { Col, Row, Space } from "antd";
import CardService from "../cards/CardService";
import ServicesStoreClass from "../../../store/ServicesStoreClass";


const servicesStore = new ServicesStoreClass();


const ServiceFind = observer(() => {
  useEffect(() => {
    servicesStore.getServicesList()

    return () => {
      servicesStore.deleteServicesList();
    }
  }, [])


  return (
    <div className="service_find">
      <h2 className="service_find_title title--border"> Посмотреть услуги </h2>
      <Row
        justify={'space-between'}
        className="service_find_row"
      >
        <Col
          className="service_find_result"
          span={24}
        >
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {servicesStore.ServicesList.map((service: IService) =>
              <CardService
                service={service}
                key={service.service_id}
              />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  )
});


export default ServiceFind;