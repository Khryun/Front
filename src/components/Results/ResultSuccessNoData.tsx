import { Result } from "antd";


interface ResultSuccessNoDataProps {
  title?: string,
  subTitle: string,
}


const ResultSuccessNoData = (props: ResultSuccessNoDataProps) => {
  return (
    <Result
      status="404"
      title={props.title ?? "Ничего не найдено"}
      subTitle={props.subTitle}
    />
  )
};


export default ResultSuccessNoData;