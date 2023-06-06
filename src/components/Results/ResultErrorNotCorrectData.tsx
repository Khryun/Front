import { Result } from "antd";


interface ResultNotCorrectDataProps {
  title: string,
}


const ResultErrorNotCorrectData = ({title}: ResultNotCorrectDataProps) => {
  return (
    <Result
      status="error"
      title={title}
      subTitle="Пожалуйста, проверьте, что вы ввели корректные данные, пишите ФИО с заглавных букв и в нужном порядке!
      Также возможно, что это ошибка сервера."
    />
  )
}


export default ResultErrorNotCorrectData;