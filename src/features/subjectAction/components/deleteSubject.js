import { toast } from "react-toastify"
import { stringToArrayOfWeek, reCount, mergeWeek } from "./handleSide"
import message from "../../../data/toastMessage"
import { SetResultSearchHandled, SetCounter, SetClear } from "../../../data/constantProvider"
import * as crypto from "../../../libs/crypto"
import { listColor } from "../../../data/data"

function changeEmptyTime(subjectInfo, listEmptyTime) {
  const Tuan = stringToArrayOfWeek(subjectInfo.Tuan)
  Tuan.forEach((rootItem, index) => {
    rootItem.forEach(item => {
      const TKT = subjectInfo.TBD[index] + subjectInfo.ST[index] - 1
      listEmptyTime[item][`${subjectInfo.Thu[index]}`].fill(0, subjectInfo.TBD[index] - 1, TKT)
    })
  })
  return listEmptyTime
}

function changeSchedule(subjectInfo, listSchedule) {
  const Tuan = mergeWeek(stringToArrayOfWeek(subjectInfo.Tuan))
  Tuan.forEach((rootItem, rootIndex) => {
    listSchedule[rootItem] = listSchedule[rootItem].filter((item, index) => {
      return item.MaMH !== subjectInfo.MaMH
    })
  })
  return listSchedule
}

function changeSubjectRegister(subjectInfo, listSubjectRegistered) {
  listSubjectRegistered = listSubjectRegistered.filter(item => {
    return subjectInfo.MaMH !== item.MaMH
  })
  return listSubjectRegistered
}

function actionDelete(myStore, subjectInfo) {
  try {
    const table = myStore.state.tableValue
    // Delete empty time
    const emptyTime = changeEmptyTime(subjectInfo, table.ListEmptyTime)
    // Delete schedule
    const schedule = changeSchedule(subjectInfo, table.ListSchedule)
    // Delete subject
    const subject = changeSubjectRegister(subjectInfo, table.ListSubjectRegistered)
    table.ListEmptyTime = emptyTime
    table.ListSchedule = schedule
    table.ListSubjectRegistered = subject
    localStorage.setItem(myStore.state.tabs, crypto.encrypt(JSON.stringify(subject)))
  } catch (err) {
    throw err
  }
}

function deleteCurrentSubjectInState(table, subjectInfo) {
  table.ListSubjectRegistered.forEach(item => {
    if (item.MaMH === subjectInfo.MaMH) {
      try {
        // Delete empty time
        const emptyTime = changeEmptyTime(item, table.ListEmptyTime)
        // Delete schedule
        const schedule = changeSchedule(item, table.ListSchedule)
        // Delete subject
        const subject = changeSubjectRegister(item, table.ListSubjectRegistered)
        table.ListEmptyTime = emptyTime
        table.ListSchedule = schedule
        table.ListSubjectRegistered = subject
        subjectInfo.Color = item.Color
      } catch (err) {
        throw err
      }
    }
  })
}

function actionDeleteAllWithRender(myStore) {
  if (myStore.state.semester && myStore.state.tableValue.ListSubjectRegistered) {
    if (myStore.state.tableValue.ListSubjectRegistered.length !== 0) {
      localStorage.setItem(myStore.state.tabs, crypto.encrypt(JSON.stringify([])))
      localStorage.setItem("color", crypto.encrypt(JSON.stringify(listColor)))
      myStore.dispatch({ type: SetClear })
    }
  }
}

function actionDeleteWithRender(myStore, subjectInfo) {
  actionDelete(myStore, subjectInfo)
  const result = myStore.state.resultSearchHandled.map(item => {
    if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
      return { ...item, choice: false }
    }
    return { ...item }
  })
  myStore.dispatch({ type: SetResultSearchHandled, payload: result })
  myStore.dispatch({ type: SetCounter, payload: reCount(myStore.state.tableValue.ListSubjectRegistered) })
  toast.success(message.removeSuccess)
}

export {
  actionDeleteWithRender,
  actionDeleteAllWithRender,
  deleteCurrentSubjectInState
}
