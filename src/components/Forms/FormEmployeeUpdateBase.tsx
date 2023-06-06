import { IService } from "../../options/model/service.model";
import { FormBaseProps } from "../../options/model/props/formBaseProps.model"
import { IEmployeeUpdate } from "../../options/model/employee.model"
import { useEffect, useState } from "react";
import { Form, Input, Select, SelectProps } from "antd";
import ServicesStoreClass from "../../store/ServicesStoreClass";
import FormPeopleUpdateBase from "./FormPeopleUpdateBase"


const selectPosts = [
  { label: "Парикмахер", value: "Парикмахер" },
  { label: "Уборщик", value: "Уборщик" },
  { label: "Администратор", value: "Администратор" },
  { label: "Менеджер", value: "Менеджер" },
  { label: "Управляющий", value: "Управляющий" },
  { label: "Аналитик", value: "Аналитик" },
];
const servicesStore = new ServicesStoreClass();

interface FormEmployeeUpdateBaseProps extends FormBaseProps {
  employee: IEmployeeUpdate
}


const FormEmployeeUpdateBase = (props: FormEmployeeUpdateBaseProps) => {
  const [disabledServices, setDisabledServices] = useState<boolean>(false);
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

  // const changePost = (value: string) => {
  //   if (value === "Парикмахер") {
  //     setDisabledServices(false);
  //   } else {
  //     setDisabledServices(true);
  //     props.form.setFieldValue("services_id", undefined);
  //   }
  // }


  useEffect(() => {
    getServices();
    // if (props.employee.post !== "Парикмахер") {
    //   setDisabledServices(true);
    // }

    return () => {
      servicesStore.deleteServicesList();
    }
  }, [])


  return (
    <FormPeopleUpdateBase
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      defaultPeopleInfo={props.employee}
    >
      <Form.Item
        label="Возраст"
        name="age"
        initialValue={props.employee.age}
        rules={[
          {
            pattern: new RegExp(/^[1-9]\d{1,2}$/),
            message: "Введите адекватный возраст!"
          }
        ]}
      >
        <Input placeholder="Введите возраст" />
      </Form.Item>
      <Form.Item
        label="Опыт работы (мес)"
        name="experience"
        initialValue={props.employee.experience}
        rules={[
          {
            pattern: new RegExp(/^\d{1,4}$/),
            message: "Введите адекватный опыт работы в месяцах!"
          }
        ]}
      >
        <Input placeholder="Введите опыт работы" />
      </Form.Item>
      <Form.Item
        label="Зарплата"
        name="salary"
        initialValue={props.employee.salary}
        rules={[
          {
            pattern: new RegExp(/^[1-9]\d{1,5}$/),
            message: "Введите зарплату выше МРОТ по Москве!"
          }
        ]}
      >
        <Input placeholder="Введите размер зарплаты" />
      </Form.Item>
      <Form.Item
        label="Краткая информация"
        name="brief_info"
        initialValue={props.employee.brief_info}
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
          placeholder="Введите краткую информацию о сотруднике"
        />
      </Form.Item>
      {/* <Form.Item
        label="Позиция"
        name="post"
        initialValue={props.employee.post}
      >
        <Select
          // labelInValue
          options={selectPosts}
          onChange={changePost}
          placeholder="Выберите позицию"
        />
      </Form.Item> */}
      {props.employee.post === "Парикмахер" && selectServices?.length !== 0 &&
        <Form.Item
          label="Услуги"
          name="services_id"
          initialValue={props.employee.services_id}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите услуги"
            options={selectServices}
            // disabled={disabledServices}
            loading={!selectServices}
          />
        </Form.Item>
        // : <p> Загрузка... </p>
      }
    </FormPeopleUpdateBase>
  )
};


export default FormEmployeeUpdateBase;