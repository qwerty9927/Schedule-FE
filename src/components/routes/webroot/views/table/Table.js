import { useContext } from "react"
import style from "../../assets/css/table/table.module.css"
import Subject from "./Subject"
import Context from "../../../../store/Context"

function Table(){
  const myStore = useContext(Context)
  return (
    <>
      <div style={{ margin: "0 32px"}}>
        <div className={style.table}>
          <div className={style.subject_title}>
            <table style={{width:"100%"}} rules="all">
              <tbody>
                <tr>
                  <th width="25px"></th>
                  <th title="Mã môn học" width="55px">MaMH</th>
                  <th >Tên môn học</th>
                  <th title="Nhóm môn học" width="40px">NMH</th>
                  <th title="Tổ thực hành" width="40px">TTH</th>
                  <th title="Số tính chỉ" width="40px">STC</th>
                  <th title="Số tính chỉ học phí" width="50px">STCHP</th>
                  <th width="60px">Mã lớp</th>
                  <th width="40px">Sĩ số</th>
                  <th title="Thực hành" width="30px">TH</th>
                  <th width="40px">Thứ</th>
                  <th title="Tiết bắt đầu" width="40px">TBD</th>
                  <th title="Số tiết" width="40px">ST</th>
                  <th width="55px">Phòng</th>
                  <th width="75px">Giảng viên</th>
                  <th width="130px">Tuần</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={style.subject_box}>
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