import { CardForm } from "../../style/typescript/cardForm";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { Button, Card, DatePicker, Form, Input, Space } from "antd";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";


const FormScheduleAddBase = (props: FormBaseProps) => {
  return (
    <Card title="Добавить расписание" style={CardForm}>
      <Form
        layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          label="Номер телефона сотрудника"
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
          label="Выберите дату"
          name="date_work"
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
            placeholder="Выберите дату"
            locale={locale}
          />
        </Form.Item>
        <Form.Item label="Введите длительность рабочего дня" required={true}>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <Form.Item
              name={["duration", "start_work"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Это поле является обязательным!",
                },
                {
                  pattern: new RegExp(/^[0-2][0-9][\:][0-5][0-9]$/),
                  message: "Введите нормальный промежуток!"
                }
              ]}
            >
              <Input placeholder="Введите начало рабочего дня" />
            </Form.Item>
            <Form.Item
              name={["duration", "end_work"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Это поле является обязательным!",
                },
                {
                  pattern: new RegExp(/^[0-2][0-9][\:][0-5][0-9]$/),
                  message: "Введите нормальный промежуток!"
                }
              ]}
            >
              <Input placeholder="Введите конец рабочего дня" />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={props.form.submit}> Добавить </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormScheduleAddBase;