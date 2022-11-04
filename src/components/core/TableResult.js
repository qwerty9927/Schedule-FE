import { useContext } from "react"
import Context from "../store/Context"
import { actionDeleteWithRender } from '../utils/CustomAction'

function TableResult() {
  const myStore = useContext(Context)
  return (
    <div className="table_result">
      <table width="100%">
        <tbody>
          <tr>
            <th>STT</th>
            <th>Mã môn học</th>
            <th>Tên môn học</th>
            <th>Nhóm môn học</th>
            <th>Xóa</th>
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