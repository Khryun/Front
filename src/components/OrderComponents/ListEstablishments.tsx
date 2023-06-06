import '../../style/css/order/listEstablishments.css';
import { IEstablishmentBase } from "../../options/model/establishment.model";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, List, Row } from "antd"
import { useEffect, useRef, useState } from "react";
import OrderDetailsStoreClass from "../../store/enrollStore/OrderDetailsStoreClass";
import EstablishmentPAStoreClass from "../../store/paStore/EstablishmentsPAStoreClass";


const selectorListEstablishments: string = ".enroll_list_establishments";
const selectorDeleteButton: string = ".enroll_list_establishments_item_meta_button_delete";
const selectorAddButton: string = ".enroll_list_establishments_item_meta_button_add";

interface ListEstablishmentsProps {
  orderDetailsStore: OrderDetailsStoreClass,
  establishmentStore: EstablishmentPAStoreClass,
}


const ListEstablishments = ({ establishmentStore, orderDetailsStore }: ListEstablishmentsProps) => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const useListEstablishments = useRef<Element | null>(null);
  const useListDeleteButtons = useRef<NodeListOf<Element> | null>(null);
  const useListAddButtons = useRef<NodeListOf<Element> | null>(null);


  const loadingPage = async () => {
    await establishmentStore.getEstablishmentsList()
      .then(() => {
        setIsLoader(true);
      })
    //Обработка ошибки
  }


  const changeChoice = () => {
    Array.from(useListDeleteButtons.current!).forEach((el: any) => el.style.display = "none");
    Array.from(useListAddButtons.current!).forEach((el: any) => el.style.display = "inline-block");
  }


  const onClickAddService = async (e: any, establishment: IEstablishmentBase) => {
    const button = e.target.closest(selectorAddButton);

    changeChoice();
    button.style.display = "none";
    button.nextElementSibling.style.display = "inline-block";
    orderDetailsStore.setOrderDetailsEstablishment(establishment);
  }

  const onClickDeleteService = (e: any) => {
    const button = e.target.closest(selectorDeleteButton);

    button.style.display = "none";
    button.previousElementSibling.style.display = "inline-block";
  }

  const onClickClearChoice = () => {
    if (establishmentStore.EstablishmentsList.length) {
      orderDetailsStore.deleteOrderDetailsEstablishment();
      changeChoice();
    }
  }


  useEffect(() => {
    const getLists = () => {
      useListEstablishments.current = document.querySelector(selectorListEstablishments);
      useListDeleteButtons.current = useListEstablishments.current!.querySelectorAll(selectorDeleteButton);
      useListAddButtons.current = useListEstablishments.current!.querySelectorAll(selectorAddButton);
    }

    const returnChoice = () => {
      const ListItems = useListEstablishments.current!.querySelectorAll(".enroll_list_establishments_item");
      Array.from(ListItems).every((el: any) => {
        if (el.getAttribute("data-id") == orderDetailsStore.OrderDetailsEstablishment?.establishment_id) {
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
      className="enroll_list_establishments"
      itemLayout="horizontal"
      bordered
      loading={!establishmentStore.EstablishmentsList.length}
      header={
        <Row
          justify={'space-between'}
          wrap={false}
          className="enroll_list_establishments_header"
        >
          <Col></Col>
          <Col className="enroll_list_establishments_header_title"> Список адресов </Col>
          <Col className="enroll_list_establishments_header_buttons">
            <Button
              className="enroll_list_establishments_header_button"
              onClick={onClickClearChoice}
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      }
    >
      {establishmentStore.EstablishmentsList.map((establishment: IEstablishmentBase) =>
        <List.Item
          className="enroll_list_establishments_item"
          key={establishment.establishment_id}
          data-id={establishment.establishment_id}
        >
          <List.Item.Meta
            className="enroll_list_establishments_item_meta"
            description={
              <Row
                wrap={false}
                justify={'space-between'}
                align={'middle'}
                className="enroll_list_establishments_item_meta_row">
                <Col className="enroll_list_establishments_item_meta_info">
                  <p className="enroll_list_establishments_item_meta_info_address">
                    {establishment.address_establishment}
                  </p>
                </Col>
                <Col className="enroll_list_establishments_item_meta_buttons">
                  <Button
                    className="enroll_list_establishments_item_meta_button_add button_text--center button--black"
                    shape="circle"
                    onClick={(e) => onClickAddService(e, establishment)}>
                    +
                  </Button>
                  <Button
                    className="enroll_list_establishments_item_meta_button_delete button_text--center button--white"
                    shape="circle"
                    onClick={(e) => onClickDeleteService(e)}>
                    -
                  </Button>
                </Col>
              </Row>
            }
          />
        </List.Item>
      )}
    </List>
  )
};


export default ListEstablishments;