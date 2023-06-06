import { Result } from "antd";


interface ResultSuccessProps {
  title?: string,
}


const ResultSuccess = (props: ResultSuccessProps) => {
  return (
    <Result
      status="success"
      title={props.title ?? "Запрос успешно выполнен!"}
    />
  )
};


export default ResultSuccess;