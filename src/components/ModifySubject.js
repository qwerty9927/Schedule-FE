import { Fragment, useContext, useEffect, useLayoutEffect, useRef, useState,  } from "react";
import { Button, Col, Input, Modal, Popover, Row, Tooltip } from "antd"
import { toast } from "react-toastify";
import { SketchPicker } from 'react-color'
import Context from "../context/Context";
import style from "../assets/css/userScreen/modifySubject.module.css"
import convertToWord from "../utils/convertToWord";
import { modifySubject, stringToArrayOfWeek } from "../features/subjectAction";
import message from "../data/toastMessage";
import Emoji from "./Emoji";
import convertStringColorToObject from "../utils/convertStringColorToObject";

function ModifySubject({cardInfo, isModalOpen, setIsModalOpen}){
  const [nameSubject, setNameSubject] = useState(cardInfo.TenMH)
  const [newRooms, setNewRooms] = useState(cardInfo.Phong)
  const [color, setColor] = useState(convertStringColorToObject(cardInfo.Color))
  const myStore = useContext(Context)
  const Tuan = stringToArrayOfWeek(cardInfo.Tuan)
  const maxLengthNameSubject = 60

  const handleOk = () => {
    if(verifyForm()){
      setIsModalOpen(false);
      cardInfo.TenMH = nameSubject
      cardInfo.Phong = newRooms
      cardInfo.Color = Object.values(color).join(",")
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
    setColor(convertStringColorToObject(cardInfo.Color))
  }

  const handleChangeComplete = (clr) => {
    const {a, ...excepta} = clr.rgb
    setColor(excepta)
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
      <Row align="middle">
        <Col>
          <p>Màu:&#160;</p>
        </Col>
        <Col>
        <Popover 
          placement="bottomLeft"
          content={<SketchPicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          }
          trigger="click"
          >
            <Button><div style={{background: `rgb(${Object.values(color).join(",")})`, height: 20, width: 50}}></div></Button>
        </Popover>
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
            <Popover placement="bottomRight" content={<Emoji maxLengthNameSubject={maxLengthNameSubject} setEmoji={setNameSubject} />} trigger="click" >
              <Button type="dashed" danger shape="circle">😀</Button>
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