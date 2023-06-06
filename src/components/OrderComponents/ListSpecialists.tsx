import '../../style/css/order/listSpecialists.css';
import { observer } from "mobx-react";
import { ISpecialist } from "../../options/model/specialist.model";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Avatar, List, Row, Col, Button, Rate } from "antd";
import OrderDetailsStoreClass from "../../store/enrollStore/OrderDetailsStoreClass";
import SpecialistsPAStoreClass from "../../store/paStore/SpecialistsPAStoreClass";


const selectorListSpecialists: string = ".enroll_list_specialists";
const selectorDeleteButton: string = ".enroll_list_specialists_item_meta_button_delete";
const selectorAddButton: string = ".enroll_list_specialists_item_meta_button_add";

interface ListServicesProps {
  specialistsStore: SpecialistsPAStoreClass,
  orderDetailsStore: OrderDetailsStoreClass,
}


const ListSpecialists = observer(({ specialistsStore, orderDetailsStore }: ListServicesProps) => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const useListSpecialists = useRef<Element | null>(null);
  const useListDeleteButtons = useRef<NodeListOf<Element> | null>(null);
  const useListAddButtons = useRef<NodeListOf<Element> | null>(null);


  const loadingPage = async () => {
    await specialistsStore.getSpecialistListByEstablishmentId(orderDetailsStore.OrderDetailsEstablishment!.establishment_id)
      .then(() => {
        setIsLoader(true);
      })
    //Обработка ошибки
  }


  const changeChoice = () => {
    Array.from(useListDeleteButtons.current!).forEach((el: any) => el.style.display = "none");
    Array.from(useListAddButtons.current!).forEach((el: any) => el.style.display = "inline-block");
  }

  const onClickAddService = async (e: any, specialist: ISpecialist) => {
    const button = e.target.closest(selectorAddButton);

    changeChoice();
    button.style.display = "none";
    button.nextElementSibling.style.display = "inline-block";
    orderDetailsStore.setOrderDetailsSpecialist(specialist);
  }

  const onClickDeleteService = (e: any) => {
    const button = e.target.closest(selectorDeleteButton);

    button.style.display = "none";
    button.previousElementSibling.style.display = "inline-block";
  }

  const onClickClearChoice = () => {
    if (specialistsStore.SpecialistsList.length) {
      orderDetailsStore.deleteOrderDetailsSpecialist();
      changeChoice();
    }
  }


  useEffect(() => {
    const getLists = () => {
      useListSpecialists.current = document.querySelector(selectorListSpecialists);
      useListDeleteButtons.current = useListSpecialists.current!.querySelectorAll(selectorDeleteButton);
      useListAddButtons.current = useListSpecialists.current!.querySelectorAll(selectorAddButton);
    }

    const returnChoice = () => {
      const ListItems = useListSpecialists.current!.querySelectorAll(".enroll_list_specialists_item");
      Array.from(ListItems).every((el: any) => {
        if (el.getAttribute("data-id") == orderDetailsStore.OrderDetailsSpecialist?.employee_id) {
          const addButton = el.querySelector(selectorAddButton);
          changeChoice();
          addButton.style.display = "none";
          addButton.nextElementSibling.style.display = "inline-block";
          return false;
        }

        return true;
      });
    }

    if (!isLoader) {
      loadingPage();
    } else {
      getLists();
      returnChoice();
    }
  }, [isLoader])


  return (
    <List
      className="enroll_list_specialists"
      itemLayout="horizontal"
      bordered
      loading={!specialistsStore.SpecialistsList.length}
      header={
        <Row
          justify={'space-between'}
          wrap={false}
          className="enroll_list_specialists_header"
        >
          <Col></Col>
          <Col className="enroll_list_specialists_header_title"> Список специалистов </Col>
          <Col className="enroll_list_specialists_header_buttons">
            <Button
              className="enroll_list_specialists_header_button"
              onClick={onClickClearChoice}
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      }
    >
      {specialistsStore.SpecialistsList.length !== 0
        ? specialistsStore.SpecialistsList.map((specialist: ISpecialist) =>
          <List.Item
            className="enroll_list_specialists_item"
            key={specialist.employee_id}
            data-id={specialist.employee_id}
          >
            <List.Item.Meta
              className="enroll_list_specialists_item_meta"
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${specialist.employee_id}`} />}
              title={specialist.full_name}
              description={
                <Row
                  wrap={false}
                  justify={'space-between'}
                  align={'middle'}
                  className="enroll_list_specialists_item_meta_row">
                  <Col className="enroll_list_specialists_item_meta_info">
                    <p className="enroll_list_specialists_item_meta_info_position"> {specialist.post} </p>
                    <Rate className="enroll_list_specialists_item_meta_info_raring" allowHalf disabled value={specialist.rating} />
                  </Col>
                  <Col className="enroll_list_specialists_item_meta_buttons">
                    <Button
                      className="enroll_list_specialists_item_meta_button_add button_text--center button--black"
                      shape="circle"
                      onClick={(e) => onClickAddService(e, specialist)}>
                      +
                    </Button>
                    <Button
                      className="enroll_list_specialists_item_meta_button_delete button_text--center button--white"
                      shape="circle"
                      onClick={(e) => onClickDeleteService(e)}>
                      -
                    </Button>
                  </Col>
                </Row>
              }
            />
          </List.Item>
        )
        : <p style={{margin: "20px 0"}}> Нет доступных записей </p>
      }
    </List>
  )
});


export default ListSpecialists;