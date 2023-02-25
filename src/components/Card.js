import { useContext } from 'react';
import Context from '../context/Context';
import style from '../assets/css/userScreen/card.module.css'
import { deleteSubject } from '../features/subjectAction/index'

function Card({cardInfo, index, color}){
  const myStore = useContext(Context)
  const handleClick = () => {
    deleteSubject(myStore, cardInfo)
  }

  return (
    <td rowSpan={cardInfo.ST[index]} className={style.card} style={{backgroundColor: `rgba(${color}, 0.2)`}}> 
      <div className={style.card_content}>
        <div className={style.border} style={{backgroundColor: `rgb(${color})`}}></div>
        <div className={style.box}>
          <div className={style.title_card} style={{color: `rgb(${color})`}}>{cardInfo.TenMH}</div>
          <div className={style.detail_card}>Phòng: <span>{cardInfo.Phong[index]}</span></div>
        </div> 
        
        <div className={style.close} onClick={handleClick}>
          <div className={style.close_visible}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className={style.popover_content}>
            <p><span>Tên môn học: </span>{cardInfo.TenMH}</p>
            <p><span>Mã môn học: </span>{cardInfo.MaMH}</p>
            <p><span>Nhóm môn học: </span>{cardInfo.NMH}</p>
            <p><span>Giảng viên: </span>{Array.from(new Set(cardInfo.GiangVien)).join(", ")}</p>
          </div>
        </div>
      </div>
    </td>
  )
}

export default Card