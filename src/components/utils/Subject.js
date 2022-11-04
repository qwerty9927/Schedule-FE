import { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import './css/subject.css'
import ConvertToWord from '../service/ConvertToWord'
import { actionAdd, actionDelete } from '../service/HandleAction'
import Context from '../store/Context'
import { SetResultSearch, SetTableValue } from '../store/Constant'
import { actionAddWithRender, actionDeleteWithRender } from '../utils/CustomAction'

function Subject({ subjectInfo }) {
  const myStore = useContext(Context)
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      actionAddWithRender(myStore, subjectInfo)
    } else {
      actionDeleteWithRender(myStore, subjectInfo)
    }
  }

  return (
    <div className="subject">
      <table style={{ borderCollapse: "collapse", width: "100%" }} rules="all" border="1" cellSpacing="0" cellPadding="0">
        <tbody>
          <tr style={{ backgroundColor: subjectInfo.choice ? "#eee" : "#fff", transition: ".4s" }}>
            <td width="25px" align="center"><input type="checkbox" checked={subjectInfo.choice || false} style={{ width: 20, height: 20, cursor: 'pointer' }} onChange={(e) => handleCheckBox(e)}></input></td>
            <td width="60px" align="center">{subjectInfo.MaMH}</td>
            <td width="200px" align="left">&nbsp;{subjectInfo.TenMH}</td>
            <td width="50px" align="center">{subjectInfo.NMH}</td>
            <td width="40px" align="center">{subjectInfo.TTH}</td>
            <td width="40px" align="center">{subjectInfo.STC}</td>
            <td width="60px" align="center">{subjectInfo.STCHP}</td>
            <td width="80px" align="center">{subjectInfo.MaLop}</td>
            <td width="40px" align="center">{subjectInfo.SiSo}</td>
            <td width="30px" align="center">{subjectInfo.CL}</td>
            <td width="30px" align="center"><div>{subjectInfo.TH}</div></td>
            <td width="40px" align="center">
              {ConvertToWord(subjectInfo.Thu).map((item, index) => {
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
            <td width="60px" align="center">
              {subjectInfo.Phong.map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
            <td width="100px" align="center">
              {subjectInfo.GiangVien.map((item, index) => {
                return <div key={index}>{item}</div>
              })}
            </td>
            <td style={{ fontSize: "12px", fontFamily: "Courier" }}>
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