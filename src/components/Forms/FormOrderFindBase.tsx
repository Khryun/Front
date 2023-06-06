import { CardForm } from "../../style/typescript/cardForm";
import { ReactNode } from "react";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { Button, Card, DatePicker, Form, Radio, Space } from "antd";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";

interface FormOrderFindBaseProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormOrderFindBase = (props: FormOrderFindBaseProps) => {

  const clearFieldValues = () => {
    props.form.resetFields();
  }

  return (
    <Card
      className="client_form"
      title="Найти заказ"
      style={CardForm}
    >
      {props.children}

      <Form layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          label="Выберите дату"
          name="date"
        >
          <DatePicker
            format={dateFormat}
            style={{ width: "100%" }}
            placeholder="Выберите дату"
            locale={locale}
          />
        </Form.Item>
        <Form.Item
          label="Тип чека"
          name="paid"
          style={{ textAlign: "left" }}
        >
          <Radio.Group defaultValue={undefined}>
            <Space direction="vertical">
              <Radio value={undefined}> Все </Radio>
              <Radio value={true}> Оплаченные </Radio>
              <Radio value={false}> Неоплаченные </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button block type="primary" onClick={props.form.submit}> Найти </Button>
            <Button block danger onClick={clearFieldValues}> Очистить </Button>
            {props.buttons}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
};


export default FormOrderFindBase;