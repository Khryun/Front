import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Button, Col, Pagination, Row, Space, message } from "antd";
import { IEmployeeLogin, IEmployeeLoginUpdate } from "../../../options/model/employeeLogin.model";
import loginStore from "../../../store/LoginStoreClass";
import ResultSuccess from "../../Results/ResultSuccess";
import CardPAEmployeeLogin from "../cards/CardPAEmployeeLogin";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import EmployeeLoginServices from "../../../services/employeeLogin.service";
import FormEmployeeLoginFind from "../forms/FormEmployeeLoginFind";
import ModalUpdateEmployeeLogin from "../modals/ModalUpdateEmployeeLogin";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";


const pageSize: number = 6;
const employeeStore = new EmployeePAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

const getCorrectValue = (values: IEmployeeLoginUpdate, employeeStore: EmployeePAStoreClass) => {
  return {
    ...values,
    "password": values["password"]?.length ? values["password"] : employeeStore.employeeLogin!.login,
  }
}


const EmployeeLoginFind = observer(() => {
  const [form] = useForm();
  const [page, setPage] = useState<number>(1);
  const [messageApi, contextHolder] = message.useMessage();


  const errorUpdateLogin = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка выдачи пароля!",
    });
  }

  const successUpdateLogin = () => {
    messageApi.open({
      type: "success",
      content: "Пароль успешно выдан!",
    });
  }

  const errorDeleteLogin = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка удаления пользователя!",
    });
  }

  const successDeleteLogin = () => {
    messageApi.open({
      type: "success",
      content: "Пользователь успешно удалён!",
    });
  }


  const handlerGetEmployeesLogin = async () => {
    notificationsStore?.deleteNotificationsEmployee();
    employeeStore.deleteEmployeesLogin();
    employeeStore.deleteEmployeeLogin();
    const employees: IEmployeeLogin[] = await EmployeeLoginServices.getAll();
    employeeStore.setEmployeesLogin(employees);
  }


  const onFinishCreateEmployee = async (values: IEmployeeLoginUpdate) => {
    const correctValue: IEmployeeLoginUpdate = getCorrectValue(values, employeeStore);

    await EmployeeLoginServices.createEmployeeLogin(employeeStore.employeeLogin!.employee_id, correctValue)
      .then(async () => {
        successUpdateLogin();
        const employee = await EmployeeLoginServices.getEmployeeLogin(employeeStore.employeeLogin!.employee_id);
        employeeStore.deleteEmployeeLogin();
        employeeStore.setEmployeeLogin(employee);
      })
      .catch(() => errorUpdateLogin());
  }

  const onFinishCreateEmployees = async (values: IEmployeeLoginUpdate) => {
    const correctValue: IEmployeeLoginUpdate = getCorrectValue(values, employeeStore);

    await EmployeeLoginServices.createEmployeeLogin(employeeStore.employeeLogin!.employee_id, correctValue)
      .then(async () => {
        successUpdateLogin();
        const employees: IEmployeeLogin[] = await EmployeeLoginServices.getAll();
        employeeStore.deleteEmployeesLogin();
        employeeStore.setEmployeesLogin(employees);
      })
      .catch(() => errorUpdateLogin());
  }

  const onFinishUpdateEmployee = async (values: IEmployeeLoginUpdate) => {
    const correctValue: IEmployeeLoginUpdate = getCorrectValue(values, employeeStore);

    await EmployeeLoginServices.updateEmployeeLogin(employeeStore.employeeLogin!.employee_id, correctValue)
      .then(async () => {
        successUpdateLogin();
        const employee = await EmployeeLoginServices.getEmployeeLogin(employeeStore.employeeLogin!.employee_id);
        employeeStore.deleteEmployeeLogin();
        employeeStore.setEmployeeLogin(employee);
      })
      .catch(() => errorUpdateLogin());
  }

  const onFinishUpdateEmployees = async (values: IEmployeeLoginUpdate) => {
    const correctValue: IEmployeeLoginUpdate = getCorrectValue(values, employeeStore);

    await EmployeeLoginServices.updateEmployeeLogin(employeeStore.employeeLogin!.employee_id, correctValue)
      .then(async () => {
        successUpdateLogin();
        const employees: IEmployeeLogin[] = await EmployeeLoginServices.getAll();
        employeeStore.deleteEmployeesLogin();
        employeeStore.setEmployeesLogin(employees);
      })
      .catch(() => errorUpdateLogin());
  }


  const handlerCreateEmployeeLogin = (employee: IEmployeeLogin) => {
    ModalUpdateEmployeeLogin(form, employee, onFinishCreateEmployee);
  }

  const handlerCreateEmployeesLogin = (employee: IEmployeeLogin) => {
    employeeStore.setEmployeeLogin(employee);
    ModalUpdateEmployeeLogin(form, employee, onFinishCreateEmployees);
  }

  const handlerUpdateEmployeeLogin = (employee: IEmployeeLogin) => {
    ModalUpdateEmployeeLogin(form, employee, onFinishUpdateEmployee);
  };

  const handlerUpdateEmployeesLogin = (employee: IEmployeeLogin) => {
    employeeStore.setEmployeeLogin(employee);
    ModalUpdateEmployeeLogin(form, employee, onFinishUpdateEmployees);
  };

  const handlerDeleteEmployeeLogin = async (employee: IEmployeeLogin) => {
    await EmployeeLoginServices.deleteEmployeeLogin(employee.employee_id)
      .then(() => {
        employeeStore.deleteEmployeeLogin();
        notificationsStore?.setIsDeleteEmployee(true);
      })
  }

  const handlerDeleteEmployeesLogin = async (employee: IEmployeeLogin) => {
    await EmployeeLoginServices.deleteEmployeeLogin(employee.employee_id)
      .then(async () => {
        successDeleteLogin();
        const employees: IEmployeeLogin[] = await EmployeeLoginServices.getAll();
        employeeStore.setEmployeesLogin(employees);
      })
      .catch(() => errorDeleteLogin());
  }


  useEffect(() => {
    console.log(loginStore.user!.user_id)
    return () => {
      employeeStore.deleteEmployeeLogin();
      employeeStore.deleteEmployeesLogin();
      notificationsStore.deleteNotificationsEmployee();
    }
  }, [])


  return (
    <div className="employeelogin_find">
      <h2 className="employeelogin_find_title title--border"> Выдать пароль </h2>
      {contextHolder}
      <Row
        justify={'space-between'}
        className="employeelogin_find_row"
      >
        <Col
          className="employeelogin_find_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormEmployeeLoginFind
            employeeStore={employeeStore}
            notificationsStore={notificationsStore}
          />
          <Button
            block
            style={{ marginTop: "10px" }}
            onClick={handlerGetEmployeesLogin}
          >
            Найти всех
          </Button>
        </Col>
        <Col
          className="employeelogin_find_result"
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          {employeeStore.employeeLogin && employeeStore.employeesLogin.length === 0 &&
            <CardPAEmployeeLogin
              title="Сотрудник"
              employee={employeeStore.employeeLogin}
            >
              {employeeStore.employeeLogin.login
                ? <Button
                  block
                  onClick={() => handlerUpdateEmployeeLogin(employeeStore.employeeLogin!)}
                  style={{ marginBottom: "10px" }}
                >
                  Изменить пароль
                </Button>
                : <Button
                  block
                  onClick={() => handlerCreateEmployeeLogin(employeeStore.employeeLogin!)}
                  style={{ marginBottom: "10px" }}
                >
                  Выдать пароль
                </Button>
              }
              <Button
                block
                disabled={
                  loginStore.user!.user_id === employeeStore.employeeLogin.employee_id
                  || Boolean(!employeeStore.employeeLogin.login)
                }
                onClick={() => handlerDeleteEmployeeLogin(employeeStore.employeeLogin!)}
              >
                Удалить пользователя
              </Button>
            </CardPAEmployeeLogin>
          }
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {employeeStore.employeesLogin.filter((employee: IEmployeeLogin, index: number) => {
              return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
            }).map((employee: IEmployeeLogin) =>
              <CardPAEmployeeLogin
                title="Сотрудник"
                employee={employee}
                key={employee.employee_id}
              >
                {employee.login
                  ? <Button
                    block
                    onClick={() => handlerUpdateEmployeesLogin(employee)}
                    style={{ marginBottom: "10px" }}
                  >
                    Изменить пароль
                  </Button>
                  : <Button
                    block
                    onClick={() => handlerCreateEmployeesLogin(employee)}
                    style={{ marginBottom: "10px" }}
                  >
                    Выдать пароль
                  </Button>
                }
                <Button
                  block
                  disabled={
                    loginStore.user!.user_id === employee.employee_id
                    || Boolean(!employee.login)
                  }
                  onClick={() => handlerDeleteEmployeesLogin(employee)}
                >
                  Удалить пользователя
                </Button>
              </CardPAEmployeeLogin>
            )}
          </Space>
          {employeeStore.employeesLogin.length !== 0 &&
            <Pagination
              current={page}
              pageSize={pageSize}
              onChange={setPage}
              style={{ marginTop: "30px" }}
              total={employeeStore.employeesLogin.length || 0}
            />
          }

          {notificationsStore?.isNotFindEmployee &&
            <ResultErrorNotCorrectData title="Сотрудник не был найден" />
          }
          {notificationsStore?.isDeleteEmployee &&
            <ResultSuccess title="Пользователь был успешно удалён" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default EmployeeLoginFind;