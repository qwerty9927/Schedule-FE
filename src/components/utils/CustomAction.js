import { toast } from 'react-toastify'
import CryptoJS from 'crypto-js'
import { v4 } from "uuid"
import { SetNewTabs, SetClear, SetCounter, SetResultSearchHandled } from '../store/Constant'
import { actionAdd, actionDelete } from '../service/HandleAction'
import CustomToast from './CustomToast'
import message from "./toastMessage"

function reCount(ListSubjectRegistered) {
  const subjectRegistered = ListSubjectRegistered || []
  let count = 0
  subjectRegistered.forEach(item => {
    count += item.STC
  });
  return count
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

function actionDeleteAll(myStore) {
  if (myStore.state.semester && myStore.state.tableValue.ListSubjectRegistered) {
    if (myStore.state.tableValue.ListSubjectRegistered.length !== 0) {
      if (window.confirm("Bạn muốn xóa tất cả ?")) {
        localStorage.setItem(myStore.state.tabs, CryptoJS.AES.encrypt(JSON.stringify([]), process.env.REACT_APP_SECRET_KEY))
        myStore.dispatch({ type: SetClear })
      }
    }
  }
}

function actionAddNewTab(myStore, name = "New tab") {
  if (myStore.state.semester) {
    if(myStore.state.listTabs.length < 5){
      const string = v4()
      localStorage.setItem("currentTabs", string)
      localStorage.setItem(myStore.state.semester, JSON.stringify([...myStore.state.listTabs, {name, id: string}]))
      myStore.dispatch({ type: SetNewTabs })
    } else {
      toast.info(message.tabsInfo)
    }
  } else {
    toast.warn(message.schoolYearWarn)
  }
}

function actionImportNewTab(myStore, data) {
  if (data.semester === myStore.state.semester) {
    if(myStore.state.listTabs.length < 5){
      const string = v4()
      localStorage.setItem("currentTabs", string)
      localStorage.setItem(data.semester, JSON.stringify([...myStore.state.listTabs, {name: data.name, id: string}]))
      localStorage.setItem(string, CryptoJS.AES.encrypt(JSON.stringify(data.ListSubjectRegistered), process.env.REACT_APP_SECRET_KEY))
      myStore.dispatch({ type: SetNewTabs })
    } else {
      toast.info(message.importInfo)
    }
  } else {
    toast.warn(message.importWarn(data.semester))
  }
}

export { actionAddWithRender, actionDeleteWithRender, actionDeleteAll, actionAddNewTab, actionImportNewTab }
