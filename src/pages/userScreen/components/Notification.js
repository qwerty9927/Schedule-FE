import { Divider, Row, Col } from "antd"
import clsx from "clsx"
import "animate.css"
import style from "../../../assets/css/userScreen/notification.module.css"

function Notification(){
  return (
    <>
      <Row className={style.notification}>
        <p className={style.title}>Thông báo</p>
        <Col span={18} offset={3} className={style.messageNoti}>
          <div>
            <span className={clsx("animate__animated animate__flash animate__slow animate__infinite", style.new)}>New</span>
            <span> [20/4/2023] Cập nhật tính năng chỉnh sửa thông tin và màu sắc môn học trên thời khóa biểu. Sử dụng trong trường hợp muốn thay đổi tên, phòng học, màu sắc của môn học. </span>
            <a href="/guide.pdf" target="_blank"><u>Chức năng mới</u></a>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Notification