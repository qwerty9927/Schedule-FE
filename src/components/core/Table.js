import Subject from "../utils/Subject"
import Context from "../store/Context"
import { useContext, useEffect, useState } from "react"
import { SetFlowChecked } from "../store/Constant"

function Table(){
  const myStore = useContext(Context)
  return (
    <>
      <div style={{ margin: "0 32px"}}>
        <div className="table">
          <div className="subject_title">
            <table style={{width:"100%"}} rules="all">
              <tbody>
                <tr>
                  <th width="25px"></th>
                  <th title="Mã môn học" width="60px">MaMH</th>
                  <th width="200px">Tên môn học</th>
                  <th title="Nhóm môn học" width="50px">NMH</th>
                  <th title="Tổ thực hành" width="40px">TTH</th>
                  <th title="Số tính chỉ" width="40px">STC</th>
                  <th title="Số tính chỉ học phí" width="60px">STCHP</th>
                  <th width="80px">Mã lớp</th>
                  <th width="40px">Sĩ số</th>
                  <th title="Thực hành" width="30px">TH</th>
                  <th width="40px">Thứ</th>
                  <th title="Tiết bắt đầu" width="40px">TBD</th>
                  <th title="Số tiết" width="40px">ST</th>
                  <th width="80px">Phòng</th>
                  <th width="110px">Giảng viên</th>
                  <th>Tuần</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="subject_box">
            {
              myStore.state.resultSearchHandled.map((item, index) => {
                return (
                  <Subject key={index} subjectInfo={item} />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Table