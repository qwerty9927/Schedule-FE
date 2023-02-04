import { Fragment } from "react"
import style from "../assets/css/notFound.module.css"

function NotFound(){
  return (
    <>
      <div className={style.number}>404</div>
      <div className={style.text}>
        <span>Ooops...</span>
        <p>Hiện tại phòng học đã bị thay đổi không còn chính xác.</p>
        <p>Xin quay lại sau khi thông báo này mất!</p>
      </div>
    </>
  )
}

export default NotFound