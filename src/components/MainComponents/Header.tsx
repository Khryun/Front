import '../../style/css/header/header.css';
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Row, Image, MenuProps, Menu, Col } from "antd";
import { FormOutlined, HomeOutlined, LoginOutlined } from "@ant-design/icons";
import loginStore from "../../store/LoginStoreClass";


const itemsBase: MenuProps['items'] = [
  {
    label: <Link to="/"> Главная </Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  // {
  //   label: <Link to="/enroll"> Записаться </Link>,
  //   key: "enroll",
  //   icon: <FormOutlined />,
  // },
]

const itemsBaseWithAuth: MenuProps['items'] = [
  ...itemsBase,
  {
    label: <Link to="/auth"> Авторизоваться </Link>,
    key: "auth",
    icon: <LoginOutlined />,
  },
];

const itemsBaseWithPersAccount: MenuProps['items'] = [
  ...itemsBase,
  {
    label: <Link to="/personal_account"> Личный кабинет </Link>,
    key: "personal_account",
    icon: <LoginOutlined />,
  },
];


const Header = observer(() => {
  return (
    <Row
      justify={'center'}
      wrap={false}
      className="header_row"
    >
      <Col className="header_logo">
        <Image
          src={require('../../options/images/logo/logo.png')}
          preview={false}
        />
      </Col>
      <Col className="navigation" span={4}>
        {loginStore.isLogin
          ? <Menu mode="horizontal" items={itemsBaseWithPersAccount} />
          : <Menu mode="horizontal" items={itemsBaseWithAuth} />
        }
      </Col>
    </Row>
  );
});


export default Header;