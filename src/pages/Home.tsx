import '../style/css/main/home.css';
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { IService } from "../options/model/service.model";
import { useEffect } from "react";
import CardService from "../components/Cards/CardService";
import ServicesStoreClass from "../store/ServicesStoreClass";


const servicesStore =  new ServicesStoreClass();


const Home = observer(() => {
  useEffect(() => {
    if (!servicesStore.ServicesListHome.length) {
      servicesStore.getServicesListHome();
    }
  }, [])


  return (
    <div className="home_page">
      <div className="services_and_price">
        <h1 className="services_and_price_title title--border"> Услуги и цены </h1>
        <Row justify={'center'} className="services_and_price_row"> 
          {servicesStore.ServicesListHome.map((service: IService) =>
            <Col className="services_and_price_card" key={service.service_id} span={4}>
              <CardService service={service} />
            </Col>
          )}
        </Row>
      </div>

      <div className="about_us">
        <h1 className="about_us_header title--border "> О нас </h1>
        <h3 className="about_us_subtitle"> BarberShop В МОСКВЕ - ЭТО МОЙ БАРБЕРШОП! </h3>
        <p className="about_us_text">
          Твой имидж - инструмент успеха? Ты сам решаешь, как тебе выглядеть? BarberShop - это место где мужчина, знающий,
          чего хочет от жизни, формирует свой стиль. Мы - мужская парикмахерская, собравшая лучших профессионалов Москвы,
          которые воплотят в реальность твое желание выглядеть стильно.
        </p>
      </div>

      <div className="contacts">
        <h1 className="contacts_header title--border"> Контакты </h1>
        <div className="contacts_info">
          <div className="contacts_info_address">
            МОСКВА,
            <br /> НОВОДАНИЛОВСКАЯ НАБЕРЕЖНАЯ,
            <br /> Д. 4, СТР. 3
            <br /> М. «ТУЛЬСКАЯ»
          </div>
          <a className="contacts_info_telephone" href="tel:+74951897453"> 8 (495) 189-74-53</a>
          <p className="contacts_info_text">
            Без выходных: 10:00-21:00
            <br /> Бесплатная парковка для гостей
          </p>
        </div>
      </div>
    </div>
  )
});


export default Home;