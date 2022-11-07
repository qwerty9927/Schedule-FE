import Subject from "../utils/Subject"
import Context from "../store/Context"
import { useContext, useEffect, useState } from "react"
import { SetFlowChecked } from "../store/Constant"

function Table(){
  const myStore = useContext(Context)
  return (
    <div className="table">
      <div className="subject_title">
        <table style={{width:"100%"}} rules="all">
          <tbody>
            <tr>
              <th width="25px"></th>
              <th width="60px">MaMH</th>
              <th width="200x">Tên môn học</th>
              <th width="50px">NMH</th>
              <th width="40px">TTH</th>
              <th width="40px">STC</th>
              <th width="60px">STCHP</th>
              <th width="80px">Mã lớp</th>
              <th width="40px">Sĩ số</th>
              <th width="30px">TH</th>
              <th width="40px">Thứ</th>
              <th width="40px">TBD</th>
              <th width="40px">ST</th>
              <th width="80px">Phòng</th>
              <th width="110px">Giảng viên</th>
              <th>Tuần</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="subject_box">
        {
          myStore.state.resultSearch.map((item, index) => {
            return (
              <Subject key={index} subjectInfo={item} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Table