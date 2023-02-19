import { Link } from "react-router-dom"
import { Button, Tooltip, Divider, Badge } from "antd"
import { BellOutlined } from "@ant-design/icons"
import style from "../assets/css/navigate.module.css"

function Navigate() {
  return (
    <>
      <div className={style.nav}>
        <div className={style.navLogo}>Schedule</div>
        <div className={style.navCtrl}>
          <Link to={"/"}>Home</Link>
          <Link to={"/SubjectRegister"}>Subject register</Link>
          <Link to={"/Schedule"}>Schedule</Link>
        </div>
        <div className={style.navInfo}>
          <Tooltip title="Notification">
            <Badge dot={true} offset={[-2, 8]}>
              <Button shape="circle" icon={<BellOutlined />} />
            </Badge>
          </Tooltip>
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  )
}

export default Navigate