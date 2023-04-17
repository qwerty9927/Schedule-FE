import { Fragment, useContext, useEffect } from "react"
import style from "../assets/css/userScreen/boneSchedule.module.css"
import { stringToArrayOfWeek } from "../features/subjectAction/index"
import Context from "../context/Context"
import Card from "./Card"
import Tabs from "./Tabs"

function BoneSchedule({ refer, option }) {
  const myStore = useContext(Context)
  const listColor = ["0,0,255", "255,165,0", "0,83,156", "122,32,72", "138,170,229", "184,80,66", "49,119,115", "255,20,164", "43,174,102", "224,169,109", "153,244,67"]
  
  const renderSchedule = (week) => {
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
    const schedule = myStore.state.tableValue.ListSchedule ? myStore.state.tableValue.ListSchedule[week] || [] : []
    for (i = 0; i < row; i++) {
      for (j = 0; j < col; j++) {
        for (k = 0; k < schedule.length; k++) {
          schedule[k].Thu.forEach((item, index) => {
            if(stringToArrayOfWeek(schedule[k].Tuan)[index].includes(week)){
              if(item === j + 2 && i <= 5 && schedule[k].TBD[index] === i + 1){
                  board[i][j] = <Card cardInfo={schedule[k]} index={index} color={listColor[k]} />
                for(z = 1;z < schedule[k].ST[index];z++){
                  board[i + z][j] = null
                }
              }
              if(item === j + 2 && i > 5 && schedule[k].TBD[index] === i){
                  board[i][j] = <Card cardInfo={schedule[k]} index={index} color={listColor[k]} />
                for(z = 1;z < schedule[k].ST[index];z++){
                  board[i + z][j] = null
                }
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
          <td className={i + 1 === 6 ? [style.secondary] : null}>{ i + 1 === 6 ? "Trưa" : `Tiết ${i + 1 > 6 ? i : i + 1}` }</td>
          {data[i].map((item, index) => <Fragment key={index}>{item}</Fragment>)}
        </tr>
      )
    }
    return result
  }


  return (
    <div className={style.schedule} >
      <Tabs style={style} />
      <div className={style.table_schedule_core} ref={refer}>
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
            {handleRender(renderSchedule(option))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BoneSchedule