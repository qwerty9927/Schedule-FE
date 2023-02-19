import { Col, Row } from "antd"
import style from "../../assets/css/home/home.module.css"
import Thumbnail from "./Thumbnail"
import Notification from "./Notification"
import Feedback from "./Feedback"

function Home(){
  return (
    <>
      <Thumbnail />
      <Notification />
      <Feedback />
    </>
  )
}

export default Home