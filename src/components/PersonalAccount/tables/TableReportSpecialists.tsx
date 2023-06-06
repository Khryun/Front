import { CardForm } from "../../../style/typescript/cardForm";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IReportSpecialists } from "../../../options/model/report.model";


interface DataType {
  key: number,
  full_name: string,
  profit: number,
  period_grade: number,
  amount_checks: number,
}

const columns: ColumnsType<DataType> = [
  {
    title: "ФИО специалиста",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Доход",
    dataIndex: "profit",
    key: "profit",
  },
  {
    title: "Оценка",
    dataIndex: "period_grade",
    key: "period_grade",
  },
  {
    title: "Кол-во заказов",
    dataIndex: "amount_checks",
    key: "amount_checks",
  },
];

interface TableReportSpecialistsProps {
  specialists: IReportSpecialists[],
}



const TableReportSpecialists = (props: TableReportSpecialistsProps) => {
  const data: DataType[] = [];
  props.specialists.forEach((specialist: IReportSpecialists) => {
    data.push({
      key: specialist.employee_id,
      full_name: specialist.full_name,
      profit: specialist.profit,
      period_grade: specialist.period_grade,
      amount_checks: specialist.amount_checks,
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



export default TableReportSpecialists;