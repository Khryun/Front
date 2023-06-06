import { CardForm } from "../../../style/typescript/cardForm";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IReportServices } from "../../../options/model/report.model";


interface DataType {
  key: number,
  name_service: string,
  profit: number,
  amount_checks: number,
}

const columns: ColumnsType<DataType> = [
  {
    title: "Название услуги",
    dataIndex: "name_service",
    key: "name_service",
  },
  {
    title: "Доход",
    dataIndex: "profit",
    key: "profit",
  },
  {
    title: "Кол-во заказов",
    dataIndex: "amount_checks",
    key: "amount_checks",
  },
];

interface TableReportServicesProps {
  services: IReportServices[],
}



const TableReportServices = (props: TableReportServicesProps) => {
  const data: DataType[] = [];
  props.services.forEach((service: IReportServices) => {
    data.push({
      key: service.service_id,
      name_service: service.name_service,
      profit: service.profit,
      amount_checks: service.amount_checks,
    })
  })
  return (
    <Card style={CardForm}>
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={data}
        tableLayout={"fixed"}
      />
    </Card>
  )
};



export default TableReportServices;