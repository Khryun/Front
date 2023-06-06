import { CardForm } from "../../style/typescript/cardForm";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { Button, Card, Form, Input } from "antd";


const FormPeopleFindBase = (props: FormBaseProps) => {
  return (
    <Card title={props.title} style={CardForm}>
      <Form
        layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
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
          <Input defaultValue="+7 (916) 419-52-28" placeholder="Например, +7 (999) 999-99-99" />
        </Form.Item>

        {props.children}

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={props.form.submit}> Найти </Button>
        </Form.Item>
      </Form>
    </Card>
  )
};


export default FormPeopleFindBase;