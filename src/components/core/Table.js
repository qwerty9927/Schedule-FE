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
              <th width="85px">MaMH</th>
              <th width="200x">TenMH</th>
              <th width="50px">NMH</th>
              <th width="40px">TTH</th>
              <th width="40px">STC</th>
              <th width="60px">STCHP</th>
              <th width="80px">MaLop</th>
              <th width="40px">SiSo</th>
              <th width="30px">Cl</th>
              <th width="30px">TH</th>
              <th width="40px">Thu</th>
              <th width="40px">TBD</th>
              <th width="40px">ST</th>
              <th width="60px">Phong</th>
              <th width="100px">Giang vien</th>
              <th style={{fontSize: "12px", fontWeight: "normal"}} align="left">&nbsp;123456789012345</th>
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