import clsx from "clsx"
import { Button, Tooltip, Divider, Badge } from "antd"
import { BellOutlined } from "@ant-design/icons"
import style from "../assets/css/userScreen/navigate.module.css"
import { SelectNavigate } from "../data/constantProviderNavigate"
import { NavigateConsumer } from "../context/NavigateProvider"
import { Link } from "react-router-dom"

function Navigate() {
  const navigateStore = NavigateConsumer()
  const handleNavigate = (e) => {
    const order = parseInt(e.target.getAttribute("data"))
    navigateStore.dispatch({type: SelectNavigate, payload: order})
    localStorage.setItem("currentNavigate", order)
  }
  return (
    <>
      <div className={style.nav}>
        <div className={style.navLogo}>Schedule</div>
        <div className={style.navCtrl}>
          <span data="1" className={clsx({[style.active]: navigateStore.state.navigate === 1})} onClick={handleNavigate}>Home</span>
          <span data="2" className={clsx({[style.active]: navigateStore.state.navigate === 2})} onClick={handleNavigate}>Subject register</span>
          {/* <span data="3" className={clsx({[style.active]: navigateStore.state.navigate === 3})} onClick={handleNavigate}>Schedule</span> */}
          {/* <Link to={"/"}>Home</Link>
          <Link to={"/SubjectRegister"}>Subject register</Link>
          <Link to={"/Schedule"}>Schedule</Link> */}
        </div>
        <div className={style.navInfo}>
          <Tooltip title="Notification">
            <Badge dot={false} offset={[-2, 8]}>
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