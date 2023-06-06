import { CardForm } from "../../style/typescript/cardForm";
import { ReactNode } from "react";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { Button, Card, DatePicker, Form, Input, Radio, Space } from "antd";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";

interface FormScheduleFindBaseProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormScheduleFindBase = (props: FormScheduleFindBaseProps) => {
  const clearFieldValues = () => {
    props.form.resetFields();
  }

  return (
    <Card
      className="schedule_form"
      title="Найти расписание"
      style={CardForm}
    >
      {props.children}

      <Form layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          label="Номер телефона"
          name="telephone"
          rules={[
            {
              pattern: new RegExp(/^\+7\s[\(]9\d{2}[\)]\s\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/),
              message: "Пример ввода: +7 (916) 419-52-28"
            }
          ]}
        >
          <Input placeholder="Например, +7 (999) 999-99-99" />
        </Form.Item>
        <Form.Item
          label="Выберите дату c"
          name="date_work"
        >
          <DatePicker
            format={dateFormat}
            style={{ width: "100%" }}
            placeholder="Выберите дату"
            locale={locale}
          />
        </Form.Item>
        <Form.Item
          label="Присутствие"
          name="presence"
          style={{ textAlign: "left" }}
        >
          <Radio.Group defaultValue={undefined}>
            <Space direction="vertical">
              <Radio value={undefined}> Все </Radio>
              <Radio value={true}> Да </Radio>
              <Radio value={false}> Нет </Radio>
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
}


export default FormScheduleFindBase;