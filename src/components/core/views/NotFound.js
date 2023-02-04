import { Fragment } from "react"
import style from "../assets/css/notFound.module.css"

function NotFound(){
  return (
    <>
      <div className={style.number}>404</div>
      <div className={style.text}>
        <span>Ooops...</span>
        <p>page not found</p>
      </div>
    </>
  )
}

export default NotFound