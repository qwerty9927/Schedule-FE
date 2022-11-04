import { useContext } from "react"
import Context from "../store/Context"
import { actionDeleteWithRender } from '../utils/CustomAction'

function TableResult() {
  const myStore = useContext(Context)
  return (
    <div className="table_result">
      <h3>Môn đã chọn</h3>
      <table width="100%">
        <tbody>
          <tr>
            <th width="10%">STT</th>
            <th width="25%">Mã môn học</th>
            <th width="40%">Tên môn học</th>
            <th width="15%">Nhóm môn học</th>
            <th width="10%">Xóa</th>
          </tr>
        {(myStore.state.tableValue.ListSubjectRegistered || []).map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.MaMH}</td>
              <td>{item.TenMH}</td>
              <td>{item.NMH}</td>
              <td onClick={() => {actionDeleteWithRender(myStore, item)}}><i className="fa-solid fa-trash-can"></i></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default TableResult