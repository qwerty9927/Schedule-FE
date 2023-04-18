import { useState, useEffect, useContext, useRef } from "react"
import { ExportOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"
import { encrypt } from "../libs/crypto"
import Context from "../context/Context"
import style from "../assets/css/userScreen/export.module.css"
import message from "../data/toastMessage"
import { Button, Popover } from "antd"

function Export(){
  const [title, setTitle] = useState("")
  const [code, setCode] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const myStore = useContext(Context)

  const handleOpenChange = (newOpen) => {
    switch(newOpen){
      case true:
        if(myStore.state.semester){
          const tabs = myStore.state.listTabs.find(item => myStore.state.tabs === item.id)
          const name = tabs ? tabs.name : "New tab"
          const object = {
            semester: myStore.state.semester,
            ListSubjectRegistered: myStore.state.tableValue.ListSubjectRegistered,
            name
          }
          const cipherText = encrypt(JSON.stringify(object))
          setCode(cipherText)
          setTitle(name)
          setIsOpen(newOpen)
        } else {
          toast.warn(message.schoolYearWarn)
        }
        break
      case false:
        setIsOpen(newOpen)
        break
    }
  }

  const handleCopy = (e) => {
    setIsOpen(false)
    navigator.clipboard.writeText(code)
    toast.info(`Copied to clipboard!`, { autoClose: 500 })
  }

  const Content = () => {
    return (
      <div className={style.content}>
        <Button onClick={handleCopy}>Click me to copy!</Button>
      </div>
    )
  }

  const Title = () => {
    return (
      <p>Export tab: <span className={style.nameFile}>{title}</span></p>
    )
  }

  return (
    <Popover open={isOpen} className={style.export} placement="bottom" content={<Content />} title={<Title />} trigger="click" onOpenChange={handleOpenChange}>
      <Button icon={<ExportOutlined />} type="primary" danger >Export</Button>
    </Popover>
  )
}

export default Export