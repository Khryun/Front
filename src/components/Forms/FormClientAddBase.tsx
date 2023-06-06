import { CardForm } from "../../style/typescript/cardForm";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { Button, Card, Form, Input } from "antd";


const FormClientAddBase = (props: FormBaseProps) => {
  return (
    <Card title="Добавить нового клиента" style={CardForm}>
      <Form layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          label="ФИО клиента"
          name="full_name"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
            {
              pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
              message: "Только русские буквы, пробелы между словами и дефисы"
            }
          ]}
        >
          <Input placeholder="Например, Иванов Иван Иваныч" />
        </Form.Item>
        <Form.Item
          label="Номер телефона"
          name="telephone"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
            {
              pattern: new RegExp(/^\+7\s[\(]9\d{2}[\)]\s\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/),
              message: "Пример ввода: +7 (916) 419-52-28"
            }
          ]}
        >
          <Input placeholder="Например, +7 (999) 999-99-99" />
        </Form.Item>
        <Form.Item
          label="Электронная почта"
          name="email"
          rules={[
            {
              pattern: new RegExp(/^[a-zA-Z\d]+\@[a-z]+\.[a-z]+$/),
              message: "Неправильный вид почты"
            }
          ]}
        >
          <Input placeholder="Например, barbershop@gmail.com" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={props.form.submit}> Добавить </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormClientAddBase;