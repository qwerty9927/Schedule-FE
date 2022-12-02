import { useContext } from 'react';
import Context from '../store/Context';
import './css/card.css'
import { actionDeleteWithRender } from '../utils/CustomAction'

function Card({cardInfo, index, color}){
  const myStore = useContext(Context)
  const handleClick = () => {
    actionDeleteWithRender(myStore, cardInfo)
  }

  return (
    <td rowSpan={cardInfo.ST[index]} className="card"> 
      <div className="card_content">
        <div className="border" style={{backgroundColor: color}}></div>
        <div className="box">
          <div className="title_card" style={{color: color}}>{cardInfo.TenMH}</div>
          <div className="detail_card">Phòng: <span>{cardInfo.Phong[index]}</span></div>
        </div> 
        
        <div className="close" onClick={handleClick}>
          <div className="close_visible">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="popover-content">
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