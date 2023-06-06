import { Result } from "antd";


interface ResultErrorConflictProps {
  title?: string,
}


const ResultErrorConflict = ({ title }: ResultErrorConflictProps) => {
  return (
    <Result
      status="warning"
      title={title ?? "Имеются некоторые проблемы с вашей операцией"}
    />
  )
}


export default ResultErrorConflict;