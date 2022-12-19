import { useEffect, useState } from "react"
import CryptoJS from "crypto-js"
import clsx from "clsx"
import style from "./css/import.module.css"
import { useContext } from "react"
import Context from "../store/Context"
import { actionImportNewTab } from "./CustomAction"
import { toast } from "react-toastify"
import message from "./toastMessage"

function Import() {
  const [opened, setOpened] = useState(false)
  const [code, setCode] = useState("")
  const myStore = useContext(Context)

  useEffect(() => {
    const func = (e) => {
      if(!e.target.closest(`.${style.import}`) && opened){
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
      setOpened(true)
      setCode("")
    } else {
      toast.warn(message.schoolYearWarn)
    }
  }
  
  const handleClose = () => {
    setOpened(false)
  }

  const handleChange = (e) => {
    setCode(e.target.value)
  }

  const handleImport = () => {
    if(code){
      const key = process.env.REACT_APP_SECRET_KEY
      const originalObject = JSON.parse(CryptoJS.AES.decrypt(code, key).toString(CryptoJS.enc.Utf8))
      actionImportNewTab(myStore, originalObject)
      setOpened(false)
    }
  }

  const handleClear = () => {
    setCode("")
  }

  return (
    <div className={style.import}>
      <button onClick={handleOpen}><i className="fa-solid fa-file-import"></i><span>Import</span></button>
      <div id="myModal" className={clsx(style.modal, {[style.active]: opened})}>
        <div className={style.modal_content}>
          <span className={style.close}><i className="fa-solid fa-xmark" onClick={handleClose}></i></span>
          <div className={style.modal_header}>
            <h2>Import</h2>
          </div>
          <div className={style.modal_body}>
            <textarea name="" id="" cols="30" rows="8" value={code} onChange={(e) => handleChange(e)}></textarea>
          </div>
          <div className={style.modal_footer}>
            <button className={style.btnClear} onClick={handleClear}>Clear</button>
            <button className={style.btnOk} onClick={handleImport}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Import