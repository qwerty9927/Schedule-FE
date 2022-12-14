import clsx from "clsx"
import { useContext } from "react"
import { CloseTabs, SelectTabs } from "../store/Constant"
import Context from "../store/Context"
import { actionAddNewTab } from "./CustomAction"

function Tabs({ style }) {
  const myStore = useContext(Context)

  const handleClick = (id) => {
    myStore.dispatch({ type: SelectTabs, payload: id })
  }

  const handleAdd = () => {
    actionAddNewTab(myStore)
  }

  const handleClose = (id) => {
    if (window.confirm("Ban co muon xoa tab nay ?")) {
      myStore.dispatch({ type: CloseTabs, payload: id })
    }
  }

  return (
    <div className={style.tabs}>
      <div className={style.tabs_box}>
        {myStore.state.listTabs.map((item, index) => {
          return (
            <div className={clsx(style.tabItem, { [style.active]: item.id === myStore.state.tabs })} key={index}>
              <span className={style.tab_primary} onClick={() => handleClick(item.id)}>{item.name}</span>
              <div className={style.tab_secondary}><i className="fa-solid fa-xmark" onClick={() => handleClose(item.id)}></i></div>
            </div>
          )
        })}

        <div className={style.tabAdd} onClick={handleAdd}><i className="fa-solid fa-plus"></i></div>
      </div>
    </div>
  )
}

export default Tabs