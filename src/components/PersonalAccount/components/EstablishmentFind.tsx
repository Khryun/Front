import { observer } from "mobx-react";
import { useEffect } from "react";
import { IEstablishment } from "../../../options/model/establishment.model";
import { Col, Row, Space } from "antd";
import ResultSuccess from "../../Results/ResultSuccess";
import CardEstablishment from "../cards/CardEstablishment";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import EstablishmentPAStoreClass from "../../../store/paStore/EstablishmentsPAStoreClass";


const establishmentStore = new EstablishmentPAStoreClass();


const EstablishmentFind = observer(() => {
  useEffect(() => {
    establishmentStore.getEstablishmentsList();

    return () => {
      establishmentStore.deleteEstablishmentsList();
    }
  }, [])


  return (
    <div className="establishment_find">
      <h2 className="establishment_find_title title--border"> Посмотреть заведения </h2>
      <Row
        justify={'space-between'}
        className="establishment_find_row"
      >
        <Col
          className="establishmnet_find_result"
          span={24}
        >
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {establishmentStore.EstablishmentsList.map((establishment: IEstablishment) =>
              <CardEstablishment
                establishment={establishment}
                key={establishment.establishment_id}
              />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  )
});


export default EstablishmentFind;