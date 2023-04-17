import { useEffect, useState, useContext } from "react"
import { Button } from "antd"
import clsx from "clsx"
import { toast } from "react-toastify"
import { ImportOutlined } from "@ant-design/icons"
import style from "../assets/css/userScreen/import.module.css"
import Context from "../context/Context"
import { decrypt } from "../libs/crypto"
import { actionImport } from "../features/subjectAction"
import message from "../data/toastMessage"

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
      try {
        const originalObject = JSON.parse(decrypt(code))
        actionImport(myStore, originalObject)
        setOpened(false)
        toast.success(message.importSuccess)
      } catch(err){
        console.log(err)
        toast.error(message.importError)
      }
    }
  }

  const handleClear = () => {
    setCode("")
  }

  return (
    <div className={style.import}>
      {/* <button onClick={handleOpen}><i className="fa-solid fa-file-import"></i><span>Import</span></button> */}
      <Button type="primary" icon={<ImportOutlined />} onClick={handleOpen}>Import</Button>
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
            <Button onClick={handleClear} danger>Clear</Button>
            <Button onClick={handleImport} type="primary">Ok</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Import