import '../../style/css/footer/footer.css';
import { Col, Row, Image } from "antd";


const Footer = () => {
  return (
    <Row
      justify={'center'}
      align={'middle'}
      className="footer_row"
    >
      <Col className="footer_logo">
        <Image
          src={require("../../options/images/logo/logo.png")}
          preview={false}
        />
      </Col>
      <Col className="footer_address">
        <span> Адрес головного заведения </span>
      </Col>
    </Row>
  )
};


export default Footer;