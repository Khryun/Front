import { Col, Form, FormInstance, InputNumber, Modal, Rate, Row } from "antd";


const ModalCheckPaid = (
  form: FormInstance<any>,
  checkId: number | string,
  bonus: number,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void
) => {
  Modal.confirm({
    className: "modal_paid",
    title: <h3> Чек №{checkId} </h3>,
    icon: null,
    centered: true,
    okText: "Оплатить",
    cancelText: "Назад",
    content: (
      <Form
        layout="vertical"
        preserve={false}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Оценка"
          name="grade"
        >
          <Rate
            allowHalf
            allowClear
          />
        </Form.Item>
        <Row
          justify={'space-between'}
          wrap={false}
          align={'middle'}
        >
          <Col>
            <Form.Item
              style={{ fontWeight: 600 }}
              label="Потратить бонусы"
              name="paid_bonus"
              initialValue={0}
            >
              <InputNumber
                min={0}
                max={bonus}
                onPressEnter={(e) => e.preventDefault()}
              />
            </Form.Item>
          </Col>
          <Col>
            <p style={{ fontWeight: 400 }}> Имеется бонусов: {bonus} </p>
          </Col>
        </Row>
      </Form >
    ),
    async onOk() {
      form.submit();
    }
  });
};


export default ModalCheckPaid;