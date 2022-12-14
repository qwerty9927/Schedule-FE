import { toast } from 'react-toastify'
import { v4 } from "uuid"
import { SetNewTabs, SetClear, SetCounter, SetResultSearchHandled } from '../store/Constant'
import { actionAdd, actionDelete } from '../service/HandleAction'
import CustomToast from './CustomToast'

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
  toast.success("Xóa học phần thành công 😎")
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
      toast.success("Thêm học phần thành công 😊")
    } else {
      toast.info("Số tính chỉ đạt tối đa")
    }
  } catch (err) {
    toast.error(err ? <CustomToast err={err} /> : "Xảy ra lỗi")
  }
}

function actionDeleteAll(myStore) {
  if (myStore.state.semester && myStore.state.tableValue.ListSubjectRegistered) {
    if (myStore.state.tableValue.ListSubjectRegistered.length !== 0) {
      if (window.confirm("Bạn muốn xóa tất cả ?")) {
        localStorage.setItem(myStore.state.tabs, JSON.stringify([]))
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
      toast.warn("Khong the dung qua 5 tab")
    }
  } else {
    toast.warn("Khong the them tab khi chu chon hoc ky")
  }
}

export { actionAddWithRender, actionDeleteWithRender, actionDeleteAll, actionAddNewTab }