import { Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IServiceWithStartAndEndTime } from "../../../options/model/service.model";


interface DataType {
  key: number,
  name_service: string,
  duration: string,
  cost: number,
}

const columns: ColumnsType<DataType> = [
  {
    title: "Название услуги",
    dataIndex: "name_service",
    key: "name_service",
  },
  {
    title: "Длительность",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Стоимость",
    dataIndex: "cost",
    key: "cost",
  },
];


const ModalCheckDetails = (
  checkId: number | string,
  services: IServiceWithStartAndEndTime[]
) => {
  const data: DataType[] = [];
  services.forEach((service: IServiceWithStartAndEndTime) => {
    data.push({
      key: service.service_id,
      name_service: service.name_service,
      duration: `${service.start_order} —  ${service.end_order}`,
      cost: service.cost
    })
  })

  Modal.info({
    className: "modal_details",
    title: <h3>Чек №{checkId}</h3>,
    icon: null,
    centered: true,
    width: "700px",
    content: (
      <div className="modal_details_services">
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </div>
    )
  });
};


export default ModalCheckDetails;