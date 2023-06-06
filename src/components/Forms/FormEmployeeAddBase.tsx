import { CardForm } from "../../style/typescript/cardForm";
import { IService } from "../../options/model/service.model";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model";
import { Button, Card, Form, Input, InputNumber, Select, SelectProps } from "antd";
import ServicesStoreClass from "../../store/ServicesStoreClass";


const selectPosts = [
  { label: "Парикмахер", value: "Парикмахер" },
  { label: "Уборщик", value: "Уборщик" },
  { label: "Администратор", value: "Администратор" },
  { label: "Менеджер", value: "Менеджер" },
  { label: "Управляющий", value: "Управляющий" },
  { label: "Аналитик", value: "Аналитик" },
];
const servicesStore = new ServicesStoreClass();


const FormEmployeeAddBase = observer((props: FormBaseProps) => {
  const [disabledServices, setDisabledServices] = useState<boolean>(true);
  const [selectServices, setSelectServices] = useState<SelectProps["options"]>([]);


  const getServices = async () => {
    await servicesStore.getServicesList()
      .then(() => {
        const services: SelectProps["options"] = [];
        servicesStore.ServicesList.forEach((service: IService) => {
          services.push({
            label: service.name_service,
            value: service.service_id,
          })
        });
        setSelectServices(services);
      })
  }


  const changePost = (value: string) => {
    if (value === "Парикмахер") {
      setDisabledServices(false);
    } else {
      setDisabledServices(true);
      props.form.setFieldValue("services_id", undefined);
    }
  }


  useEffect(() => {
    getServices();

    return () => {
      servicesStore.deleteServicesList();
    }
  }, [])


  return (
    <Card
      title="Добавить нового сотрудника"
      style={CardForm}
    >
      <Form layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          label="ФИО cотрудника"
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
        <Form.Item
          label="Возраст"
          name="age"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
            {
              pattern: new RegExp(/^[1-9]\d{1,2}$/),
              message: "Введите адекватный возраст!"
            }
          ]}
        >
          <InputNumber min={16} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Опыт работы (мес)"
          name="experience"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
            {
              pattern: new RegExp(/^\d{1,4}$/),
              message: "Введите адекватный опыт работы в месяцах!"
            }
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Зарплата"
          name="salary"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
            {
              pattern: new RegExp(/^[1-9]\d{1,5}$/),
              message: "Введите зарплату выше МРОТ по Москве!"
            }
          ]}
        >
          <InputNumber
            min={24801}
            placeholder="Введите зарплату выше МРОТ по Москве!"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Краткая информация"
          name="brief_info"
          rules={[
            {
              pattern: new RegExp(/^[а-яА-Яa-zA-Z0-9\s-]+$/),
              message: "Только буквы русского и английского алфавитов, пробелы, цифры и дефис!"
            }
          ]}
        >
          <Input.TextArea
            allowClear
            style={{ resize: "none", height: "150px" }}
          />
        </Form.Item>
        <Form.Item
          label="Позиция"
          name="post"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            }
          ]}
        >
          <Select
            // labelInValue
            options={selectPosts}
            onChange={changePost}
            placeholder="Выберите позицию"
          />
        </Form.Item>
        <Form.Item
          label="Услуги"
          name="services_id"
        >
          <Select
            // labelInValue
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите услуги"
            options={selectServices}
            disabled={disabledServices}
            loading={!selectServices}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={props.form.submit}> Добавить </Button>
        </Form.Item>
      </Form>
    </Card>
  )
});


export default FormEmployeeAddBase;