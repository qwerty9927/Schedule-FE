import { Row, Col, Input, Button } from "antd"
import { SendOutlined } from "@ant-design/icons"
import style from "../../../assets/css/userScreen/feedback.module.css"

function Feedback(){
  const { TextArea } = Input
  return (
    <Row className={style.feedback}>
    <p className={style.title}>Phản hồi</p>
    <Col span={10} offset={7} className={style.boxFeed}>
      <TextArea rows={4} maxLength={255} />
      <Button type="primary" icon={<SendOutlined />}>Send</Button>
    </Col>
  </Row>
  )
}

export default Feedback