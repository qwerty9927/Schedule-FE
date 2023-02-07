import { useRouteError } from "react-router"
import style from "./assets/css/notFound.module.css"

function NotFound(){
  const error = useRouteError()

  return (
    <div id={style.notPage}>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}

export default NotFound