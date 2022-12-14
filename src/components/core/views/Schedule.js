import { Fragment, useContext, useRef, useState } from "react"
import style from "../assets/css/schedule.module.css"
import { reMakeArrTuan } from "../../service/HandleAction"
import Context from "../../store/Context"
import Card from "../../utils/Card"
import Import from "../../utils/Import"
import Export from "../../utils/Export"
import Edit from "../../utils/Edit"
import ScreenShot from "../../utils/ScreenShot"
import Tabs from "../../utils/Tabs"
import OptionTime from "../../utils/OptionTime"

function Schedule() {
  const myStore = useContext(Context)
  const ref = useRef()
  const [option, setOption] = useState(0)
  const listColor = ["255,0,0", "255,165,0", "0,83,156", "122,32,72", "138,170,229", "184,80,66", "49,119,115", "255,20,164", "43,174,102", "224,169,109", "153,244,67"]
  

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
            if(reMakeArrTuan(schedule[k].Tuan)[index].includes(week)){
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
    <div className={style.schedule_optionTime}>
      <OptionTime style={style} setOption={setOption} />
      <ScreenShot style={style} refer={ref} myStore={myStore} option={option} />
      <Import style={style} />
      <Export style={style} />
      <Edit style={style} />
      <div className={style.schedule} >
        <Tabs style={style} />
        <div className={style.table_schedule_core} ref={ref}>
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
    </div>
  )
}

export default Schedule