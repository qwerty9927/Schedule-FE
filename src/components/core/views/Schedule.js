import { Fragment, useContext, useRef, useState } from "react"
import * as htmlToImage from "html-to-image"
import { reMakeArrTuan } from "../../service/HandleAction"
import Context from "../../store/Context"
import Card from "../../utils/Card"
import { toast } from "react-toastify"
import Structure from "../../utils/Structure"

function Schedule() {
  const myStore = useContext(Context)
  const ref = useRef()
  const [option, setOption] = useState(0)
  const listColor = ["255,0,0", "255,165,0", "0,83,156", "122,32,72", "138,170,229", "184,80,66", "49,119,115", "255,20,164", "43,174,102", "224,169,109", "153,244,67"]
  const handleOption = (e) => {
    setOption(e.target.value - 1)
  }

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
          <td className={i + 1 === 6 ? "secondary" : null}>{ i + 1 === 6 ? "Trưa" : `Tiết ${i + 1 > 6 ? i : i + 1}` }</td>
          {data[i].map((item, index) => <Fragment key={index}>{item}</Fragment>)}
        </tr>
      )
    }
    return result
  }

  const takeScreenShot = async (node) => {
    const dataURL = await htmlToImage.toJpeg(node)
    return dataURL
  }

  const download = (image, { extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = `${myStore.state.semester}-Tuan_${option + 1}.${extension}`
    a.click();
  };

  const downloadScreenShot = () => {
    toast.info("Tải ảnh thời khóa biểu")
    takeScreenShot(ref.current).then(download)
  }

  return (
    <div className="schedule_optionTime">
      <div className="option_time">
        <label htmlFor="">Tuần:</label>
        <select name="" id="week" onChange={(e) => handleOption(e)}>
          {(new Array((new Structure).numberOfSchoolWeeks).fill(0)).map((item, index) => {
            return (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            )
          })}
        </select>
      </div>
      <div className="screen_shot">
        <button title="Take ScreenShot" onClick={downloadScreenShot}><i className="fa-solid fa-camera"></i></button>
      </div>
      <div className="schedule" ref={ref}>
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

export default Schedule