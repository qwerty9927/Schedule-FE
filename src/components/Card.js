import { useContext, useState } from 'react';
import { Popconfirm } from 'antd';
import Context from '../context/Context';
import style from '../assets/css/userScreen/card.module.css'
import { deleteSubject } from '../features/subjectAction/index'
import ModifySubject from './ModifySubject';

function Card({cardInfo, index}){
  const myStore = useContext(Context)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = () => {
    if(window.confirm("Bạn muốn xóa môn học?")){
      deleteSubject(myStore, cardInfo)
    }
  }

  const handleModify = () => {
    setIsModalOpen(true);
  }

  return (
    <td rowSpan={cardInfo.ST[index]} className={style.card} style={{backgroundColor: `rgba(${cardInfo.Color}, 0.2)`}}> 
      <div className={style.card_content}>
        <div className={style.border} style={{backgroundColor: `rgb(${cardInfo.Color})`}}></div>
        <div className={style.box}>
          <div className={style.title_card} style={{color: `rgb(${cardInfo.Color})`}}>{cardInfo.TenMH}</div>
          <div className={style.detail_card}>Phòng: <span>{cardInfo.Phong[index]}</span></div>
        </div> 
        <Popconfirm
          title="Xóa hay Thay đổi môn học?"
          onConfirm={handleModify}
          onCancel={handleDelete}
          okType='danger'
          okText="Thay đổi"
          cancelText="Xóa"
        >
          <div className={style.close}>
            <div className={style.close_visible}>
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className={style.popover_content}>
              <p><span>Tên môn học: </span>{cardInfo.TenMH}</p>
              <p><span>Mã môn học: </span>{cardInfo.MaMH}</p>
              <p><span>Nhóm môn học: </span>{cardInfo.NMH}</p>
              <p><span>Giảng viên: </span>{Array.from(new Set(cardInfo.GiangVien)).join(", ")}</p>
            </div>
          </div>
        </Popconfirm>
      </div>
      <ModifySubject 
        cardInfo={cardInfo} 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} />
    </td>
  )
}

export default Card