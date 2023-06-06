import { useForm } from "antd/es/form/Form";
import { IService } from "../../../options/model/service.model";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { IEmployee, IEmployeeUpdate } from "../../../options/model/employee.model";
import { Button, Col, Pagination, Row, Space, message } from "antd";
import ResultSuccess from "../../Results/ResultSuccess";
import CardPAEmployee from "../cards/CardPAEmployee";
import FormEmployeeFind from "../forms/FormEmployeeFind";
import EmployeeServices from "../../../services/employee.service";
import ServicesStoreClass from "../../../store/ServicesStoreClass";
import ModalUpdateEmployee from "../modals/ModalUpdateEmployee";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import ModalEmployeeDetails from "../modals/ModalEmployeeDetails";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import loginStore from "../../../store/LoginStoreClass";


const pageSize: number = 3;
const servicesStore = new ServicesStoreClass();
const employeeStore = new EmployeePAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

interface EmployeeFindProps {
  isUpdateEmployee?: boolean,
  isDeleteClient?: boolean,
}

const getCorrectValue = (values: IEmployeeUpdate, employeeStore: EmployeePAStoreClass) => {
  return {
    ...values,
    "full_name": values["full_name"]?.length ? values["full_name"] : employeeStore.employee!.full_name,
    "telephone": values["telephone"]?.length ? values["telephone"] : employeeStore.employee!.telephone,
    "email": values["email"]?.length ? values["email"] :
      values["email"] !== undefined ? undefined : employeeStore.employee!.email,
    "age": values["age"] > 15 ? values["age"] : employeeStore.employee!.age,
    "experience": values["experience"] ? values["experience"] : employeeStore.employee!.experience,
    "salary": values["salary"] ? values["salary"] : employeeStore.employee!.salary,
    "brief_info": values["brief_info"]?.length ? values["brief_info"] :
      values["brief_info"] !== undefined ? undefined : employeeStore.employee!.brief_info,
    "services_id": values["services_id"]?.length ? values["services_id"] : employeeStore.employee?.services_id,
  }
}


const EmployeeFind = observer((props: EmployeeFindProps) => {
  const [form] = useForm();
  const [page, setPage] = useState<number>(1);
  const [messageApi, contextHolder] = message.useMessage();


  const errorUpdateEmployee = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка обновления сотрудника!",
    });
  }

  const successUpdateEmployee = () => {
    messageApi.open({
      type: "success",
      content: "Сотрдник успешно обновлён!",
    });
  }

  const errorDeleteEmployee = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка удаления сотрудника!",
    });
  }

  const successDeleteEmployee = () => {
    messageApi.open({
      type: "success",
      content: "Сотрудник успешно удалён!",
    });
  }


  const handlerGetEmployees = async () => {
    notificationsStore?.deleteNotificationsEmployee();
    employeeStore.deleteEmployees();
    employeeStore.deleteEmployee();
    const employees: IEmployee[] = await EmployeeServices.getAll();
    employeeStore.setEmployees(employees);
  }


  const onFinishEmployee = async (values: IEmployeeUpdate) => {
    const correctValue: IEmployeeUpdate = getCorrectValue(values, employeeStore);

    await EmployeeServices.updateEmployee(employeeStore.employee!.employee_id, correctValue)
      .then(async () => {
        successUpdateEmployee();
        const employee = await EmployeeServices.getEmployee(employeeStore.employee!.employee_id);
        employeeStore.deleteEmployee();
        employeeStore.setEmployee(employee);
      })
      .catch(() => errorUpdateEmployee());
  }

  const onFinishEmployees = async (values: IEmployeeUpdate) => {
    const correctValue: IEmployeeUpdate = getCorrectValue(values, employeeStore);

    await EmployeeServices.updateEmployee(employeeStore.employee!.employee_id, correctValue)
      .then(async () => {
        successUpdateEmployee();
        const employees: IEmployee[] = await EmployeeServices.getAll();
        employeeStore.deleteEmployees();
        employeeStore.setEmployees(employees);
      })
      .catch((error) => {
        errorUpdateEmployee();
      });
  }

  const handlerUpdateEmployee = async (employee: IEmployee) => {
    ModalUpdateEmployee(form, employee, onFinishEmployee);
  };

  const handlerUpdateEmployees = async (employee: IEmployee) => {
    employeeStore.setEmployee(employee);
    ModalUpdateEmployee(form, employee, onFinishEmployees);
  };

  const handlerDeleteEmployee = async (employee: IEmployee) => {
    await EmployeeServices.deleteEmployee(employee.employee_id)
      .then(() => {
        employeeStore.deleteEmployee();
        notificationsStore?.setIsDeleteEmployee(true);
      })
  }

  const handlerDeleteEmployees = async (employee: IEmployee) => {
    await EmployeeServices.deleteEmployee(employee.employee_id)
      .then(async () => {
        successDeleteEmployee();
        const employees: IEmployee[] = await EmployeeServices.getAll();
        employeeStore.setEmployees(employees);
      })
      .catch(() => errorDeleteEmployee());
  }

  const showModalDetails = async (
    brief_info: string | undefined,
    services_id: number[] | undefined,
    rating: number | undefined,
  ) => {
    const services: string[] = [];
    servicesStore.ServicesList.forEach((service: IService) => {
      services_id?.forEach((service_id: number) => {
        if (service.service_id === service_id) {
          services.push(service.name_service);
        }
      })
    })

    ModalEmployeeDetails(brief_info, services, rating);
  };


  useEffect(() => {
    if (props.isUpdateEmployee) {
      servicesStore.getServicesList();
    }

    return () => {
      employeeStore.deleteEmployee();
      employeeStore.deleteEmployees();
      notificationsStore.deleteNotificationsEmployee();
    }
  }, [])


  return (
    <div className="employee_find">
      <h2 className="employee_find_title title--border"> Найти сотрудника </h2>
      {contextHolder}
      <Row
        justify={'space-between'}
        className="employee_find_row"
      >
        <Col
          className="employee_find_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormEmployeeFind
            employeeStore={employeeStore}
            notificationsStore={notificationsStore}
          />
          <Button
            block
            style={{ marginTop: "10px" }}
            onClick={handlerGetEmployees}
          >
            Найти всех
          </Button>
        </Col>
        <Col
          className="employee_find_result"
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          {employeeStore.employee && employeeStore.employees.length === 0 &&
            <CardPAEmployee
              title="Сотрудник"
              employee={employeeStore.employee}
            >
              <Button
                block
                onClick={() => showModalDetails(
                  employeeStore.employee?.brief_info,
                  employeeStore.employee?.services_id,
                  employeeStore.employee?.rating,
                )}
                style={{ marginBottom: "10px" }}
              >
                Подробнее
              </Button>
              {props.isUpdateEmployee &&
                <Button
                  block
                  onClick={() => handlerUpdateEmployee(employeeStore.employee!)}
                  style={{ marginBottom: "10px" }}
                >
                  Изменить
                </Button>
              }
              {props.isDeleteClient &&
                <Button
                  block
                  disabled={loginStore.user!.user_id === employeeStore.employee.employee_id}
                  onClick={() => handlerDeleteEmployee(employeeStore.employee!)}
                >
                  Удалить
                </Button>
              }
            </CardPAEmployee>
          }
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {employeeStore.employees.filter((employee: IEmployee, index: number) => {
              return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
            }).map((employee: IEmployee) =>
              <CardPAEmployee
                title="Сотрудник"
                employee={employee}
                key={employee.employee_id}
              >
                <Button
                  block
                  onClick={() => showModalDetails(
                    employee.brief_info,
                    employee.services_id,
                    employee.rating
                  )}
                  style={{ marginBottom: "10px" }}
                >
                  Подробнее
                </Button>
                {props.isUpdateEmployee &&
                  <Button
                    block
                    onClick={() => handlerUpdateEmployees(employee)}
                    style={{ marginBottom: "10px" }}
                  >
                    Изменить
                  </Button>
                }
                {props.isDeleteClient &&
                  <Button
                    block
                    disabled={loginStore.user!.user_id === employee.employee_id}
                    onClick={() => handlerDeleteEmployees(employee)}
                  >
                    Удалить
                  </Button>
                }
              </CardPAEmployee>
            )}
          </Space>
          {employeeStore.employees.length !== 0 &&
            <Pagination
              current={page}
              pageSize={pageSize}
              onChange={setPage}
              style={{ marginTop: "30px" }}
              total={employeeStore.employees.length || 0}
            />
          }

          {notificationsStore?.isNotFindEmployee &&
            <ResultErrorNotCorrectData title="Сотрудник не был найден" />
          }
          {notificationsStore?.isDeleteEmployee &&
            <ResultSuccess title="Сотрудник был успешно удалён" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default EmployeeFind;