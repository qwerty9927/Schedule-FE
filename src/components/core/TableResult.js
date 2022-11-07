import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import Context from "../store/Context"
import { actionDeleteWithRender, actionDeleteAll } from '../utils/CustomAction'

function TableResult() {
  const myStore = useContext(Context)

  return (
    <div className="table_result">
      <div style={{textAlign: "center"}}><h2>Thời khóa biểu {myStore.state.semester}</h2></div>
      <h3>Môn đã chọn</h3>
      <table width="100%">
        <tbody>
          <tr>
            <th width="10%">STT</th>
            <th width="15%">Mã môn học</th>
            <th width="40%">Tên môn học</th>
            <th width="15%">Nhóm môn học</th>
            <th width="10">Số tính chỉ</th>
            <th width="10%">Xóa</th>
          </tr>
        {(myStore.state.tableValue.ListSubjectRegistered || []).map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.MaMH}</td>
              <td>{item.TenMH}</td>
              <td>{item.NMH}</td>
              <td>{item.STC}</td>
              <td onClick={() => {actionDeleteWithRender(myStore, item)}}><i className="fa-solid fa-trash-can"></i></td>
            </tr>
          )
        })}
        <tr>
          <td colSpan={4} style={{fontWeight: "bold"}}>Tổng số tính chỉ</td>
          <td>{myStore.state.counter}</td>
          <td className="btn_clear" onClick={() => {actionDeleteAll(myStore)}}>Clear All</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableResult