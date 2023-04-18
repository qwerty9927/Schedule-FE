import { useEffect, useState, useContext, useRef } from "react"
import { Button, Popconfirm, Popover } from "antd"
import clsx from "clsx"
import { toast } from "react-toastify"
import { ImportOutlined } from "@ant-design/icons"
import style from "../assets/css/userScreen/import.module.css"
import Context from "../context/Context"
import { decrypt } from "../libs/crypto"
import { actionImport } from "../features/subjectAction"
import message from "../data/toastMessage"
import TextArea from "antd/es/input/TextArea"

function Import() {
  const ref = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const myStore = useContext(Context)

  const handleImport = () => {
    const code = ref.current.resizableTextArea.textArea.value
    if(code){
      try {
        const originalObject = JSON.parse(decrypt(code))
        actionImport(myStore, originalObject)
        toast.success(message.importSuccess)
      } catch(err){
        toast.error(message.importError)
      }
    } else {
      toast.error(message.importError)
    }
  }

  const handleOpenChange = (newOpen) => {
    if(myStore.state.semester){
      setIsOpen(newOpen)
    } else {
      toast.warn(message.schoolYearWarn)
    }
  }

  const Title = () => {
    return (
      <p>Import tab</p>
    )
  }

  const Description = () => {
    return (
      <TextArea rows={6} allowClear={true} ref={ref} />
    )
  }

  return (
    <Popconfirm 
      open={isOpen} 
      className={style.import} 
      placement="bottom" 
      description={<Description />} 
      title={<Title />} 
      onOpenChange={handleOpenChange}
      onConfirm={handleImport}
      okText="Import"
      cancelText="Cancel"
    >
      <Button type="primary" icon={<ImportOutlined />}>Import</Button>
    </Popconfirm>
  )
}

export default Import