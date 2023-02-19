import { Row, Col, Divider } from "antd"
import { Link } from "react-router-dom"
import style from "../../assets/css/home/thumbnail.module.css"

function Thumbnail(){

  return (
    <Row>
      <Col className={style.thumb} span={18} offset={3}>
        <Row>
          <Col span={6}></Col>
          <Col span={1} className={style.title}>
            <Divider type="vertical" className={style.line} />
            <div className={style.text}>
              <p>Schedule_App</p>
              <Link to={"/"}>Hướng dẫn</Link>
            </div>
          </Col>
          <Col span={17}>
            <div className={style.borderImage}>
              <div className={style.blur}></div>
              <img src="./image_2.png" alt="" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Thumbnail