import { Form, Input } from "antd";
import { IClientUpdate } from "../../options/model/client.model";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { IEmployeeUpdate } from "../../options/model/employee.model";


interface FormPeopleUpdateBase extends FormBaseProps {
  defaultPeopleInfo: IClientUpdate | IEmployeeUpdate,
}


const FormPeopleUpdateBase = (props: FormPeopleUpdateBase) => {
  return (
    <Form layout="vertical"
      form={props.form}
      preserve={false}
      style={{ width: "100%" }}
      onFinish={props.onFinish}
    >
      <Form.Item
        label="ФИО клиента"
        name="full_name"
        initialValue={props.defaultPeopleInfo.full_name}
        rules={[
          {
            pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
            message: "Только русские буквы, пробелы между словами и дефисы"
          }
        ]}
      >
        <Input
          placeholder="Например, Иванов Иван Иваныч"
        />
      </Form.Item>
      <Form.Item
        label="Номер телефона"
        name="telephone"
        initialValue={props.defaultPeopleInfo.telephone}
        rules={[
          {
            pattern: new RegExp(/^\+7\s[\(]9\d{2}[\)]\s\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/),
            message: "Пример ввода: +7 (916) 419-52-28"
          }
        ]}
      >
        <Input
          placeholder="Например, +7 (999) 999-99-99"
        />
      </Form.Item>
      <Form.Item
        label="Электронная почта"
        name="email"
        initialValue={props.defaultPeopleInfo.email}
        rules={[
          {
            pattern: new RegExp(/^[a-zA-Z\d]+\@[a-z]+\.[a-z]+$/),
            message: "Неправильный вид почты"
          }
        ]}
      >
        <Input
          placeholder="Например, barbershop@gmail.com"
        />
      </Form.Item>

      {props.children}
    </Form>
  )
}


export default FormPeopleUpdateBase;