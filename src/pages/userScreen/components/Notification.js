import { Divider, Row, Col } from "antd"
import style from "../../../assets/css/userScreen/notification.module.css"

function Notification(){
  return (
    <>
      <Row className={style.notification}>
        <p className={style.title}>Thông báo</p>
        <Col span={18} offset={3} className={style.messageNoti}>
          sfdfds
        </Col>
      </Row>
    </>
  )
}

export default Notification