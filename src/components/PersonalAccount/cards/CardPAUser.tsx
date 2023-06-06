import { Button } from "antd";
import { ReactNode } from "react";
import CardPABase from "./CardPABase";
import loginStore from "../../../store/LoginStoreClass";


interface CardPAUserProps {
  children?: ReactNode,
}


const CardPAUser = (props: CardPAUserProps) => {

  const onClickButtonLogout = () => {
    loginStore.setIsLogin(false);
    localStorage.removeItem("token")
  }


  return (
    <CardPABase title="Ваши сведения" info={loginStore.user!}>
      <div className="cardbase_info_inner">
        <h3 className="cardbase_info_inner_title"> Специальность </h3>
        <p className="cardbase_info_inner_post"> {loginStore.user!.post} </p>
      </div>

      {props.children}

      <Button
        block
        onClick={onClickButtonLogout}
        style={{ marginTop: "10px" }}
      >
        Выйти
      </Button>
    </CardPABase>
  )
};


export default CardPAUser;