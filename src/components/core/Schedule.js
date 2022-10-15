import { Fragment, useContext, useEffect, useState } from "react"
import Context from "../store/Context"
import Card from "../utils/Card"
import './css/style.css'

function Schedule() {
  const myStore = useContext(Context)

  const renderSchedule = () => {
    let i, j, k, z
    const row = 15
    const col = 6
    const board =
      [
        [], [], [], [],
        [], [], [], [],
        [], [], [], [],
        [], [], []
      ]
    const schedule = myStore.state.tableValue.Schedule || []
    for (i = 0; i < row; i++) {
      for (j = 0; j < col; j++) {
        for (k = 0; k < schedule.length; k++) {
          schedule[k].Thu.forEach((item, index) => {
            if(item === j + 2 && i <= 5 && schedule[k].TBD[index] === i + 1){
                board[i][j] = <Card cardInfo={schedule[k]} index={index} />
              for(z = 1;z < schedule[k].ST[index];z++){
                board[i + z][j] = null
              }
            }
            if(item === j + 2 && i > 5 && schedule[k].TBD[index] === i){
                board[i][j] = <Card cardInfo={schedule[k]} index={index} />
              for(z = 1;z < schedule[k].ST[index];z++){
                board[i + z][j] = null
              }
            }
          })
          
        }
        if (i + 1 === 5) {
          board[i + 2][j] = <td></td>
        }
        if (board[i][j] === undefined) {
          board[i][j] = <td></td>
        }
      }
      if (i + 1 === 5) {
        i++
      }
    }
    return board
  }

  const handleRender = (data) => {
    const result = []
    for(let i = 0;i < data.length;i++){
      result.push(
        <tr key={i}>
          <td className={i + 1 === 6 ? "secondary" : null}>{ i + 1 === 6 ? "Trưa" : `Tiết ${i + 1 > 6 ? i : i + 1}` }</td>
          {data[i].map((item, index) => <Fragment key={index}>{item}</Fragment>)}
        </tr>
      )
    }
    return result
  }

  return (
    <div className="schedule">
      <table width="100%">
        <tbody>
          <tr>
            <th width=""></th>
            <th width="15%">Thứ Hai</th>
            <th width="15%">Thứ Ba</th>
            <th width="15%">Thứ Tư</th>
            <th width="15%">Thứ Năm</th>
            <th width="15%">Thứ Sáu</th>
            <th width="15%">Thứ Bảy</th>
          </tr>
          {handleRender(renderSchedule())}
        </tbody>
      </table>
    </div>
  )
}

export default Schedule