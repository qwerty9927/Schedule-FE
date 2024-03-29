import { toast } from "react-toastify"
import { stringToArrayOfWeek, handleConfilctStructure, reCount, mergeWeek } from "./handleSide"
import { deleteCurrentSubjectInState } from "./deleteSubject"
import verifySubject from "./verifySubject"
import message from "../../../data/toastMessage"
import { SetResultSearchHandled, SetCounter } from "../../../data/constantProvider"
import * as crypto from "../../../libs/crypto"
import CustomToast from "../../../components/CustomToast"
import { listColor } from "../../../data/data"
import { getColorNotUsed } from "./handleSide"

function actionAdd(myStore, subjectInfo) {
  let {
    MaMH,
    TenMH,
    NMH,
    TTH,
    STC,
    Thu,
    TBD,
    Phong,
    GiangVien,
    ST,
    Tuan,
    CS,
  } = handleConfilctStructure({ ...subjectInfo })

  try {
    const table = JSON.parse(JSON.stringify(myStore.state.tableValue))
    deleteCurrentSubjectInState(table, subjectInfo, listColor)

    const newTuan = stringToArrayOfWeek(Tuan)
    newTuan.forEach((rootItem, rootIndex) => {
      rootItem.forEach((item, index) => {
        const result = verifySubject(Thu[rootIndex], TBD[rootIndex], ST[rootIndex], CS[rootIndex], table.ListEmptyTime[item])
        table.ListEmptyTime[item][`${Thu[rootIndex]}`] = result
      })
    })

    // Ghi vao store
    mergeWeek(newTuan).forEach((item, index) => {
      if (table.ListSchedule[item] === null) {
        table.ListSchedule[item] = new Array()
      }
      table.ListSchedule[item].push({
        MaMH,
        TenMH,
        NMH,
        STC,
        TTH,
        Thu,
        TBD,
        Phong,
        GiangVien,
        Tuan,
        ST,
        CS,
        Color: subjectInfo.Color || getColorNotUsed(listColor, table.ListSubjectRegistered)
      })
    })
    table.ListSubjectRegistered.push({
      MaMH,
      TenMH,
      NMH,
      STC,
      TTH,
      Thu,
      TBD,
      Phong,
      GiangVien,
      Tuan,
      ST,
      CS,
      Color: subjectInfo.Color || getColorNotUsed(listColor, table.ListSubjectRegistered)
    })

    // Set lại table mới cho tableValue
    myStore.state.tableValue = table

    //Thay đổi list subject registered trong localStorage
    localStorage.setItem(myStore.state.tabs, crypto.encrypt(JSON.stringify(table.ListSubjectRegistered)))
  } catch (err) {
    throw err
  }
}

function actionAddWithRender(myStore, subjectInfo) {
  try {
    if (myStore.state.counter + subjectInfo.STC <= 26) {
      actionAdd(myStore, subjectInfo)
      const result = myStore.state.resultSearchHandled.map(item => {
        if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
          return { ...item, choice: true }
        }
        return { ...item }
      })
      myStore.dispatch({ type: SetResultSearchHandled, payload: result })
      myStore.dispatch({ type: SetCounter, payload: reCount(myStore.state.tableValue.ListSubjectRegistered) })
      toast.success(message.addSuccess)
    } else {
      toast.info(message.messageInfo)
    }
  } catch (err) {
    toast.error(err ? <CustomToast err={err} /> : "Xảy ra lỗi")
  }
}

export {
  actionAddWithRender
}

