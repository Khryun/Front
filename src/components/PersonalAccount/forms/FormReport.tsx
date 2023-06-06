import { CardForm } from "../../../style/typescript/cardForm"
import { ReactNode } from "react";
import { FormBaseProps } from "../../../options/model/props/formBaseProps.model"
import { Button, Card, DatePicker, Form, Space } from "antd"

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";
interface FormReportProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormReport = (props: FormReportProps) => {
  return (
    <Card style={CardForm} title={props.title}>
      <Form layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >

        <Form.Item label="Введите промежуток" required={true}>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <Form.Item
              name={["duration", "start_date"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Это поле является обязательным!",
                }
              ]}
            >
              <DatePicker
                format={dateFormat}
                style={{ width: "100%" }}
                placeholder="Выберите начало"
                locale={locale}
              />
            </Form.Item>
            <Form.Item
              name={["duration", "end_date"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Это поле является обязательным!",
                }
              ]}
            >
              <DatePicker
                format={dateFormat}
                style={{ width: "100%" }}
                placeholder="Выберите конец"
                locale={locale}
              />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              block
              type="primary"
              onClick={props.form.submit}
            >
              Получить
            </Button>
            <Button
              block
              danger
              onClick={() => props.form.resetFields()}
            >
              Очистить
            </Button>
            {props.buttons}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
};


export default FormReport;