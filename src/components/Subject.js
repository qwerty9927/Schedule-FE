import { useContext } from 'react'
import convertToWord from '../utils/convertToWord'
import Context from '../context/Context'
import { addSubject, deleteSubject } from '../features/subjectAction/index'

function Subject({ subjectInfo }) {
  const myStore = useContext(Context)
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      addSubject(myStore, subjectInfo)
    } else {
      deleteSubject(myStore, subjectInfo)
    }
  }

  return (
    <div className="subject">
      <table style={{ borderCollapse: "collapse", width: "100%" }} rules="all" border="1" cellSpacing="0" cellPadding="0">
        <tbody>
          <tr style={{ backgroundColor: subjectInfo.choice ? "#eee" : "#fff", transition: ".4s" }}>
            <td width="25px" align="center"><input type="checkbox" checked={subjectInfo.choice || false} style={{ width: 20, height: 20, cursor: 'pointer' }} onChange={(e) => handleCheckBox(e)}></input></td>
            <td width="55px" align="center">{subjectInfo.MaMH}</td>
            <td style={{padding: "0 5px"}} align="left">&nbsp;{subjectInfo.TenMH}</td>
            <td width="40px" align="center">{subjectInfo.NMH}</td>
            <td width="40px" align="center">{subjectInfo.TTH}</td>
            <td width="40px" align="center">{subjectInfo.STC}</td>
            <td width="50px" align="center">{subjectInfo.STCHP}</td>
            <td width="60px" align="center">{subjectInfo.MaLop}</td>
            <td width="40px" align="center">{subjectInfo.SiSo}</td>
            <td width="30px" align="center"><div>{subjectInfo.TH}</div></td>
            <td width="40px" align="center">
              {convertToWord(subjectInfo.Thu).map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
            <td width="40px" align="center">
              {subjectInfo.TBD.map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
            <td width="40px" align="center">
              {subjectInfo.ST.map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
            <td width="55px" align="center">
              {subjectInfo.Phong.map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
            <td width="75px" align="center">
              {subjectInfo.GiangVien.map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
            <td width="120px" style={{ fontSize: "12px", fontFamily: "Courier"}}>
              {subjectInfo.Tuan.map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Subject