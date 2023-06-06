import { List, Modal, Rate } from "antd";


const ModalEmployeeDetails = (
  brief_info: string | undefined,
  services: string[],
  rating: number | undefined,
) => {
  const data: string[] = [];
  services.forEach((service: string) => {
    data.push(service);
  })


  Modal.info({
    className: "modal_details",
    title: <h3> Доп. информация </h3>,
    icon: null,
    centered: true,
    width: "700px",
    content: (
      <div className="modal_details_services" style={{ marginTop: "20px" }}>
        <h4 style={{ marginBottom: "10px" }}> Краткая информация </h4>
        {brief_info
          ? <p style={{ marginBottom: "20px" }}> {brief_info} </p>
          : <p style={{ marginBottom: "20px" }}> Нет никакой краткой информации... </p>
        }

        {rating &&
          <div style={{marginBottom: "20px"}}>
            <h4> Рейтинг </h4>
            <Rate
              className="cardbase_inner_info_title_rating"
              allowHalf
              disabled
              value={rating}
            />
          </div>
        }

        {services.length !== 0 &&
          <>
            <h4> Выполняемые услуги </h4>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item >
                  <List.Item.Meta
                    description={
                      <p style={{ color: "black" }} key={index}> {item} </p>
                    }
                  />
                </List.Item>
              )}
            />
          </>
        }
      </div>
    )
  });
};


export default ModalEmployeeDetails;