import clsx from "clsx"
import { useContext, useRef, useEffect } from "react"
import { CloseTabs, SelectTabs } from "../store/Constant"
import Context from "../store/Context"
import { actionAddNewTab } from "./CustomAction"

function Tabs({ style }) {
  const myStore = useContext(Context)
  const ref = useRef({})

  const handleEventAndDataTabs = () => {
    ref.current.element.setAttribute("contenteditable", "false")
    for(let i of myStore.state.listTabs){
      if(ref.current.id === i.id){
        i.name = ref.current.element.textContent ? ref.current.element.textContent : ref.current.element.textContent = "New tab"
      }
    }
    localStorage.setItem(myStore.state.semester, JSON.stringify(myStore.state.listTabs))
  }

  // useEffect(() => {
  //   const func = (e) => {
  //     if ((e.target !== ref.current.element && ref.current.element) && ref.current.element.getAttribute("contenteditable") === "true") {
  //       handleEventAndDataTabs()
  //     }
  //   }
  //   window.addEventListener("click", func)
  //   return () => {
  //     return window.removeEventListener("click", func)
  //   }
  // }, [])

  const handleClick = (e, id) => {
    if (myStore.state.tabs !== id) {
      myStore.dispatch({ type: SelectTabs, payload: id })
    }
  }

  const handleDoubleClick = (e, id) => {
    ref.current.element = e.target
    ref.current.id = id
    e.target.setAttribute("contenteditable", "true")
    e.target.focus()
  }

  const handleKeyPress = (e) => {
    if(e.which == 13){
      handleEventAndDataTabs()
    }
  }

  const handleAdd = () => {
    actionAddNewTab(myStore)
  }

  const handleClose = (id) => {
    if (window.confirm("Bạn có muốn xóa tab này ?")) {
      myStore.dispatch({ type: CloseTabs, payload: id })
    }
  }

  return (
    <div className={style.tabs}>
      <div className={style.tabs_box}>
        {myStore.state.listTabs.map((item, index) => {
          return (
            <div className={clsx(style.tabItem, { [style.active]: item.id === myStore.state.tabs })} key={index} title="Nhấn 2 lần để đổi tên">
              <span className={style.tab_primary} 
                onClick={(e) => handleClick(e, item.id)} 
                onDoubleClick={(e) => handleDoubleClick(e, item.id)}
                onKeyPress={(e) => handleKeyPress(e)}
                onBlur={handleEventAndDataTabs}
              >{item.name}</span>
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