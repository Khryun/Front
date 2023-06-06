import { DatePicker, Form, Input, Radio, Space } from "antd";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { IScheduleControlUpdate } from "../../options/model/schedule.model";
import dayjs from "dayjs";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";

interface FormScheduleUpdateBaseProps extends FormBaseProps {
  schedule: IScheduleControlUpdate
}


const FormScheduleUpdateBase = (props: FormScheduleUpdateBaseProps) => {
  const dateWorkDefault = dayjs(props.schedule.date_work);

  return (
    <Form
      layout="vertical"
      form={props.form}
      preserve={false}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item
        label="Выберите дату"
        name="date_work"
      >
        <DatePicker
          format={dateFormat}
          style={{ width: "100%" }}
          defaultValue={dateWorkDefault}
          placeholder="Выберите дату"
          locale={locale}
        />
      </Form.Item>

      <Form.Item label="Введите длительность рабочего дня">
        <Space direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["duration", "start_work"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[0-2][0-9][\:][0-5][0-9]$/),
                message: "Введите нормальный промежуток!"
              }
            ]}
          >
            <Input defaultValue={props.schedule.start_work} placeholder="Введите начало рабочего дня" />
          </Form.Item>
          <Form.Item
            name={["duration", "end_work"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[0-2][0-9][\:][0-5][0-9]$/),
                message: "Введите нормальный промежуток!"
              }
            ]}
          >
            <Input defaultValue={props.schedule.end_work} placeholder="Введите конец рабочего дня" />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item
        label="Присутствие"
        name="presence"
      >
        <Radio.Group defaultValue={props.schedule.presence}>
          <Space direction="vertical">
            <Radio value={true}> Да </Radio>
            <Radio value={false}> Нет </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form >
  )
};


export default FormScheduleUpdateBase;