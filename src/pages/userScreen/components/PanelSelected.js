import { useContext } from "react"
import { toast } from "react-toastify"
import style from "../../../assets/css/userScreen/panelSelected.module.css"
import { stringToArrayOfWeek } from "../../../features/subjectAction/index"
import Context from "../../../context/Context"
import { deleteAllSubject, deleteSubject } from "../../../features/subjectAction"
import clsx from "clsx"

function PanelSelected() {
  const myStore = useContext(Context)

  const getWeekWithOption = (option, Tuan) => {
    let newArr = []
    const week = stringToArrayOfWeek(Tuan)
    week.forEach(item => {
      newArr = [ ...newArr, ...item ]
    })
    newArr = Array.from(new Set(newArr)).sort(function(a, b){return a - b})
    switch(option){
      case "Min":
        return newArr[0] + 1
      case "Max":
        return newArr[newArr.length - 1] + 1
    }
    return null
  }

  const handleCopy = (e) => {
    navigator.clipboard.writeText(e.target.innerText)
    toast.info(`Copied to clipboard!`, { autoClose: 500 })
  }

  return (
    <div className={style.table_result}>
      <div style={{textAlign: "center"}}><h2>Thời khóa biểu {myStore.state.semester} - <span style={{color: "var(--secondary)", textTransform: "uppercase"}}>{myStore.state.majors}</span></h2></div>
      <h3>Học phần đã chọn</h3>
      <table width="100%">
        <tbody>
          <tr>
            <th width="5%">STT</th>
            <th width="10%">Mã môn học</th>
            <th width="35%">Tên môn học</th>
            <th width="12%">Nhóm môn học</th>
            <th width="10%">Tuần bắt đầu</th>
            <th width="10%">Tuần kết thúc</th>
            <th width="10%">Số tính chỉ</th>
            <th width="8%">Xóa</th>
          </tr>
        {(myStore.state.tableValue.ListSubjectRegistered || []).map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className={clsx(style.btnMaMH, "font_weight_600")} title="Click To Copy" onClick={(e) => handleCopy(e)}>{item.MaMH}</td>
              <td>{item.TenMH}</td>
              <td className="font_weight_600">{item.NMH}</td>
              <td>{getWeekWithOption("Min", item.Tuan)}</td>
              <td>{getWeekWithOption("Max", item.Tuan)}</td>
              <td>{item.STC}</td>
              <td onClick={() => {deleteSubject(myStore, item)}}><i className="fa-solid fa-trash-can"></i></td>
            </tr>
          )
        })}
        <tr>
          <td colSpan={6} className="font_weight_600">Tổng số tính chỉ</td>
          <td className="font_weight_600">{myStore.state.counter}</td>
          <td className={clsx(style.btn_clear, "font_weight_500")} onClick={() => {deleteAllSubject(myStore)}}>Clear All</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PanelSelected