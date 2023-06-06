import '../../../style/css/cards/cardCheck.css';
import { ICheck } from "../../../options/model/check.model";
import { useForm } from "antd/es/form/Form";
import { Button, Card, Space, message } from "antd";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import { IServiceWithStartAndEndTime } from "../../../options/model/service.model";
import CheckServices from "../../../services/check.service";
import ModalCheckPaid from "../modals/ModalCheckPaid";
import ModalCheckDetails from "../modals/ModalCheckDetails";
import { MessageInstance } from 'antd/es/message/interface';


interface CardCheckProps {
  check: ICheck,
  bonus?: number,
  clientId?: number,
  isChangeChecks?: boolean,
  messageApi?: MessageInstance,
  setDeleteCheckFlag: (boolean: boolean) => void,
  setPaidCheckFlag?: (boolean: boolean) => void,
}

interface IPaid {
  grade: number,
  paid_bonus: number,
}


const CardCheck = (props: CardCheckProps) => {
  const [form] = useForm();

  const errorPaidCheck = () => {
    props.messageApi?.open({
      type: "error",
      content: "Ошибка оплаты чека!",
    });
  }

  const successPaidCheck = () => {
    props.messageApi?.open({
      type: "success",
      content: "Оплата успешно произведена!",
    });
  }

  const errorDeleteCheck = () => {
    props.messageApi?.open({
      type: "error",
      content: "Ошибка удаления чека!",
    });
  }

  const successDeleteCheck = () => {
    props.messageApi?.open({
      type: "success",
      content: "Чек успешно удалён!",
    });
  }


  const ChangeButton = (isChangeChecks: boolean) => {
    if (isChangeChecks) {
      return (
        <>
          <Button block onClick={onClickDeleteButton}> Удалить </Button>
          {!props.check.paid &&
            <Button block onClick={showModalPaid}> Оплатить </Button>
          }
        </>
      )
    }
  }


  const showModalDetails = async () => {
    const services: IServiceWithStartAndEndTime[] =
      await CheckServices.getCheckDetails(props.check.check_id);
    ModalCheckDetails(props.check.check_id, services);
  };


  const onFinish = async (values: IPaid) => {
    await CheckServices.updateCheckGrade(
      values.grade,
      values.paid_bonus,
      props.check.check_id
    ).then(() => {
      successPaidCheck();
      if (props.setPaidCheckFlag) {
        props.setPaidCheckFlag(true);
      }
    })
      .catch(() => errorPaidCheck());

  }

  const showModalPaid = () => {
    ModalCheckPaid(form, props.check.check_id, props.bonus!, onFinish)
  };


  const onClickDeleteButton = async () => {
    await CheckServices.deleteCheck(props.check.check_id)
      .then(() => {
        successDeleteCheck();
        props.setDeleteCheckFlag(true);
      })
      .catch(() => errorDeleteCheck());
  }


  return (
    <Card
      className="client_check_card"
      title={"Чек №" + props.check.check_id}
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      <div className="client_check_card_info">
        <div className="client_check_card_inner">
          <h3 className="client_check_card_title"> Адресс заведения </h3>
          <p className="client_check_card_establishment"> {props.check.address_establishment} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_title"> Специалист </h3>
          <p className="client_check_card_fullname"> {props.check.full_name} </p>
          <p className="client_check_card_position"> {props.check.post} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_title"> Оплачено </h3>
          {props.check.paid
            ? <p className="client_check_card_paid"> Да </p>
            : <p className="client_check_card_paid"> Нет </p>
          }
        </div>
        <div className="client_check_card_inner">
          <h3 className="client_check_card_title"> Дата и время </h3>
          <p className="client_check_card_date"> {new Date(props.check.date_check).toLocaleDateString()} </p>
          <p className="client_check_card_time"> {props.check.start_time} — {props.check.end_time} </p>
        </div>
        <div className="client_check_card_inner" >
          <h3 className="client_check_card_title"> Стоимость услуг </h3>
          <p className="client_check_card_totalcost"> {props.check.total_cost} руб. </p>
        </div>
      </div>

      <Space
        className="client_check_card_details_buttons"
        direction="vertical"
        style={{ width: "300px" }}
      // style={{ width: "100%" }}
      >
        <Button block onClick={showModalDetails}> Подробнее </Button>
        {ChangeButton(props.isChangeChecks ?? false)}
      </Space>
    </Card >
  )
};


export default CardCheck;