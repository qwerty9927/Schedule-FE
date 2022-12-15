import clsx from "clsx"
import CryptoJS from "crypto-js"
import { useContext, useRef } from "react"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Context from "../store/Context"
import style from "./css/export.module.css"
import message from "./toastMessage"

function Export(){
  const [opened, setOpened] = useState(false)
  const [title, setTitle] = useState("")
  const myStore = useContext(Context)
  const ref = useRef()

  useEffect(() => {
    const func = (e) => {
      if(!e.target.closest(`.${style.export}`) && opened){
        setOpened(false)
      }
    }
    window.addEventListener("click", func)
    return () => {
      return window.removeEventListener("click", func)
    }
  }, [opened])

  const handleOpen = () => {
    if(myStore.state.semester){
      const name = myStore.state.listTabs.find(item => myStore.state.tabs === item.id).name
      const key = process.env.REACT_APP_SECRET_KEY
      const object = {
        semester: myStore.state.semester,
        ListSubjectRegistered: myStore.state.tableValue.ListSubjectRegistered,
        name
      }
      const cipherText = CryptoJS.AES.encrypt(JSON.stringify(object), key).toString()
      ref.current.textContent = cipherText
      setOpened(true)
      setTitle(name)
    } else {
      toast.warn(message.schoolYearWarn)
    }
  }
  
  const handleClose = () => {
    setOpened(false)
  }

  const handleClick = (e) => {
    navigator.clipboard.writeText(e.target.textContent)
    toast.info(`Copied to clipboard!`, { autoClose: 500 })
  }

  return (
    <div className={style.export}>
      <button onClick={handleOpen}><i className="fa-solid fa-file-export"></i><span>Export</span></button>
      <div id="myModal" className={clsx(style.modal, {[style.active]: opened})}>
        <div className={style.modal_content}>
          <span className={style.close}><i className="fa-solid fa-xmark" onClick={handleClose}></i></span>
          <div className={style.modal_header}>
            <h2>Export <span style={{fontWeight: "normal"}}>{title}</span></h2>
          </div>
          <div className={style.modal_body}>
            <div className={style.codeExport} ref={ref} onClick={(e) => handleClick(e)}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Export