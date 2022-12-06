import { useContext } from "react"
import { toast } from "react-toastify"
import { reMakeArrTuan } from "../service/HandleAction"
import Context from "../store/Context"
import { actionDeleteWithRender, actionDeleteAll } from '../utils/CustomAction'

function TableResult() {
  const myStore = useContext(Context)

  const getWeekWithOption = (option, Tuan) => {
    let newArr = []
    const week = reMakeArrTuan(Tuan)
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
    <div className="table_result">
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
              <td className="btnMaMH" title="Click To Copy" style={{fontWeight: "bold"}} onClick={(e) => handleCopy(e)}>{item.MaMH}</td>
              <td>{item.TenMH}</td>
              <td style={{fontWeight: "bold"}}>{item.NMH}</td>
              <td>{getWeekWithOption("Min", item.Tuan)}</td>
              <td>{getWeekWithOption("Max", item.Tuan)}</td>
              <td>{item.STC}</td>
              <td onClick={() => {actionDeleteWithRender(myStore, item)}}><i className="fa-solid fa-trash-can"></i></td>
            </tr>
          )
        })}
        <tr>
          <td colSpan={6} style={{fontWeight: "bold"}}>Tổng số tính chỉ</td>
          <td style={{fontWeight: "bold"}}>{myStore.state.counter}</td>
          <td className="btn_clear" style={{fontWeight: "bold"}} onClick={() => {actionDeleteAll(myStore)}}>Clear All</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableResult