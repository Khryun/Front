import { Form, Input } from "antd";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model"
import { IEmployeeLoginUpdate } from "../../options/model/employeeLogin.model";


interface FormEmployeeLoginUpdateBaseProps extends FormBaseProps {
  employee: IEmployeeLoginUpdate
}


const FormEmployeeLoginUpdateBase = (props: FormEmployeeLoginUpdateBaseProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      preserve={false}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item
        label="Введите новый пароль"
        name="password"
        rules={[
          {
            pattern: new RegExp(/^[a-zA-Z\d\_\@\#\=\+\-\>\<\\\/\|]+$/),
            message: "Только английские буквы, цифры и некоторые спец.символы"
          }
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
};


export default FormEmployeeLoginUpdateBase;