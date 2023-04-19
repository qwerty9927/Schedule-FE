import { Fragment, useContext, useEffect, useLayoutEffect, useRef, useState,  } from "react";
import { Button, Col, Input, Modal, Popover, Row, Tooltip } from "antd"
import { toast } from "react-toastify";
import 'toolcool-color-picker';
import Context from "../context/Context";
import style from "../assets/css/userScreen/modifySubject.module.css"
import convertToWord from "../utils/convertToWord";
import { modifySubject, stringToArrayOfWeek } from "../features/subjectAction";
import message from "../data/toastMessage";
import Emoji from "./Emoji";

function ModifySubject({cardInfo, isModalOpen, setIsModalOpen}){
  const [nameSubject, setNameSubject] = useState(cardInfo.TenMH)
  const [newRooms, setNewRooms] = useState(cardInfo.Phong)
  const [color, setColor] = useState(cardInfo.Color)
  const [isEmojiOpen, setEmojiOpen] = useState(false)
  const myStore = useContext(Context)
  const ref = useRef()
  const Tuan = stringToArrayOfWeek(cardInfo.Tuan)
  const maxLengthNameSubject = 60

  useEffect(() => {
    if(isModalOpen){
      const action = (e) => {
        setColor(e.detail.rgb.split(/\(|\)/)[1])
      }
      ref.current.addEventListener("change", action)
      return () => {
        ref.current.removeEventListener("change", action)
      }
    }
  }, [isModalOpen])

  const handleOk = () => {
    if(verifyForm()){
      setIsModalOpen(false);
      cardInfo.TenMH = nameSubject
      cardInfo.Phong = newRooms
      cardInfo.Color = color
      modifySubject(myStore, cardInfo)
      toast.success(message.modifyValidSuccess)
    } else {
      toast.error(message.modifyValidError)
    }
  }

  const verifyForm = () => {
    for(let i of newRooms){
      if(i === ""){
        return false
      }
    }
    if(nameSubject === ""){
      return false
    }
    return true
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleCloseModal = () => {
    setNameSubject(cardInfo.TenMH)
    setNewRooms(cardInfo.Phong)
    setColor(cardInfo.Color)
  }

  const handleOpenChange = (newOpen) => {
    setEmojiOpen(newOpen)
  }

  const handleColorPickerOpen = () => {
    setEmojiOpen(false)
  }

  const showCountProps = {
    formatter: ({value, count, maxLength}) => {
      return (
        <span>
          <span>
            {value.length} / {maxLength}
          </span>
        </span>
      )
    }
  }

  return (
    <Modal className={style.styleModal} width={600} title="Thay đổi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} afterClose={handleCloseModal} maskClosable={false}>
      <Row>
        <Col>
          <p>Màu:&#160;</p>
        </Col>
        <Col>
          <toolcool-color-picker color={`rgb(${color})`} id="color-picker" ref={ref} onClick={handleColorPickerOpen}></toolcool-color-picker>
        </Col>
      </Row>
      
      <p>Mã học phần: <span>{cardInfo.MaMH}</span></p>
      <p>Nhóm môn học: <span>{cardInfo.NMH}</span></p>
      <div className={style.enableModify}>
        <p>Tên môn học: </p>
        <Row gutter={8}>
          <Col span={22}>
            <Input 
              placeholder="Tên môn học" 
              showCount={showCountProps} 
              maxLength={maxLengthNameSubject} 
              onChange={(e) => setNameSubject(e.target.value)} 
              value={nameSubject}
            />
          </Col>
          <Col className={style.gutter_row} span={2}>
            <Popover open={isEmojiOpen} placement="bottomRight" content={<Emoji maxLengthNameSubject={maxLengthNameSubject} setEmoji={setNameSubject} />} trigger="click" onOpenChange={handleOpenChange}>
              <Tooltip title="Emoji">
                <Button type="dashed" danger shape="circle">😀</Button>
              </Tooltip>
            </Popover>
          </Col>
        </Row>
      </div>
      {cardInfo.Thu.map((item, index) => {
        return (
          <Fragment key={index}>
            <p className={style.lession}>
              Thứ: <span>{convertToWord(item)}</span> &#160;---&#160; 
              Tiết: <span>{cardInfo.TBD[index]}</span> -&gt; <span>{cardInfo.TBD[index] + cardInfo.ST[index] - 1}</span> &#160;---&#160; 
              Tuần: <span>{Tuan[index].map(week => week + 1).join(", ")}</span>
            </p>
            <div className={style.enableModify}>
              <p>Phòng học:</p>
              <Input 
                placeholder="Phòng học" 
                showCount={showCountProps} 
                maxLength={10} 
                onChange={(e) => 
                  setNewRooms((preState) => {
                    const newState = [...preState]
                    newState[index] = e.target.value
                    return newState
                  })
                } 
                value={newRooms[index]}
              />
            </div>
          </Fragment>
        )
      })}
    </Modal>
  )
}

export default ModifySubject