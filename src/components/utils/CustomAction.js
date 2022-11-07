import { SetClear, SetCounter, SetResultSearch, SetResultSearchHandled, SetSemester, SetTableValue } from '../store/Constant'
import { actionAdd, actionDelete } from '../service/HandleAction'
import { toast } from 'react-toastify'
import Structure from './Structure'
import CustomToast from './CustomToast'
function actionDeleteWithRender(myStore, subjectInfo) {
  actionDelete(myStore, subjectInfo)
  const result = myStore.state.resultSearchHandled.map(item => {
    if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
      return { ...item, choice: false }
    }
    return { ...item }
  })
  myStore.dispatch({ type: SetTableValue, payload: JSON.parse(localStorage.getItem(myStore.state.semester)) })
  myStore.dispatch({ type: SetResultSearchHandled, payload: result })
  myStore.dispatch({ type: SetCounter, payload: myStore.state.counter - subjectInfo.STC })
  toast.success("Remove subject success 😎")
}

function actionAddWithRender(myStore, subjectInfo) {
  try {
    if(myStore.state.counter + subjectInfo.STC <= 26){
      actionAdd(myStore, subjectInfo)
      myStore.dispatch({ type: SetTableValue, payload: JSON.parse(localStorage.getItem(myStore.state.semester)) })
      const result = myStore.state.resultSearchHandled.map(item => {
        if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
          return { ...item, choice: true }
        }
        return { ...item }
      })
      myStore.dispatch({ type: SetResultSearchHandled, payload: result })
      myStore.dispatch({ type: SetCounter, payload: myStore.state.counter + subjectInfo.STC })
      toast.success("Add subject success 😊")
    } else {
      toast.info("Số tính chỉ đạt tối đa")
    }
  } catch (err) {
    toast.error(err)
  }
}

function actionDeleteAll(myStore) {
  if(myStore.state.semester && myStore.state.tableValue.ListSubjectRegistered){
    if(myStore.state.tableValue.ListSubjectRegistered.length !== 0) {
      if(window.confirm("Clear all ?")){
        localStorage.setItem(myStore.state.semester, JSON.stringify((new Structure()).getBaseStructure()))
        myStore.dispatch({ type: SetClear })
      }
    } else {
      toast.info("Clear het roi clear gi nua")
    }
  }
}

export { actionAddWithRender, actionDeleteWithRender, actionDeleteAll }