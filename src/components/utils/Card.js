import { useContext } from 'react';
import { actionDelete } from '../service/HandleAction';
import { SetResultSearch, SetTableValue } from '../store/Constant';
import Context from '../store/Context';
import './css/card.css'

function Card({cardInfo, index}){
  const myStore = useContext(Context)
  const handleClick = () => {
    actionDelete(cardInfo)
    const result = myStore.state.resultSearch.map(item => {
      if(item.MaMH === cardInfo.MaMH && item.NMH === cardInfo.NMH){
        return { ...item, choice: false}
      }
      return { ...item }
    })
    myStore.dispatch({type: SetTableValue, payload: JSON.parse(localStorage.getItem("table"))})
    myStore.dispatch({type: SetResultSearch, payload: result})
  }

  return (
    <td rowSpan={cardInfo.ST[index]} className="card"> 
      <div className="box">
        <div className="title_card">{cardInfo.TenMH}</div>
        <div className="detail_card">Phòng: {cardInfo.Phong[index]}</div>
      </div> 
      
      <div className="close" onClick={handleClick}>
        <div className="close_visible">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="popover-content">
          <p><span>Tên môn học: </span>{cardInfo.TenMH}</p>
          <p><span>Mã môn học: </span>{cardInfo.MaMH}</p>
          <p><span>Nhóm môn học: </span>{cardInfo.NMH}</p>
          <p><span>Giảng viên: </span></p>
          <div>{new Set(cardInfo.GiangVien)}</div>
        </div>
      </div>
    </td>
  )
}

export default Card