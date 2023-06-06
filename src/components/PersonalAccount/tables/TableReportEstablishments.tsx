import { CardForm } from "../../../style/typescript/cardForm";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IReportEstablishments } from "../../../options/model/report.model";


interface DataType {
  key: number,
  address_establishment: string,
  profit: number,
  amount_checks: number,
}

const columns: ColumnsType<DataType> = [
  {
    title: "Адрес",
    dataIndex: "address_establishment",
    key: "address_establishment",
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

interface TableReportEstablishmentsProps {
  establishments: IReportEstablishments[],
}



const TableReportEstablishments = (props: TableReportEstablishmentsProps) => {
  const data: DataType[] = [];
  props.establishments.forEach((establishment: IReportEstablishments) => {
    data.push({
      key: establishment.establishment_id,
      address_establishment: establishment.address_establishment,
      profit: establishment.profit,
      amount_checks: establishment.amount_checks,
    })
  })
  return (
    <Card style={CardForm}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        tableLayout={"fixed"}
      />
    </Card>
  )
};



export default TableReportEstablishments;