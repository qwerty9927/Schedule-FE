import { SetClear, SetCounter, SetResultSearch, SetResultSearchHandled, SetSemester, SetTableValue } from '../store/Constant'
import { actionAdd, actionDelete } from '../service/HandleAction'
import { toast } from 'react-toastify'
function actionDeleteWithRender(myStore, subjectInfo) {
  actionDelete(myStore, subjectInfo)
  const result = myStore.state.resultSearchHandled.map(item => {
    if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
      return { ...item, choice: false }
    }
    return { ...item }
  })
  myStore.dispatch({ type: SetResultSearchHandled, payload: result })
  myStore.dispatch({ type: SetCounter, payload: myStore.state.counter - subjectInfo.STC })
  toast.success("Xóa học phần thành công 😎")
}

function actionAddWithRender(myStore, subjectInfo) {
  try {
    if(myStore.state.counter + subjectInfo.STC <= 26){
      actionAdd(myStore, subjectInfo)
      const result = myStore.state.resultSearchHandled.map(item => {
        if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
          return { ...item, choice: true }
        }
        return { ...item }
      })
      myStore.dispatch({ type: SetResultSearchHandled, payload: result })
      myStore.dispatch({ type: SetCounter, payload: myStore.state.counter + subjectInfo.STC })
      toast.success("Thêm học phần thành công 😊")
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
      if(window.confirm("Bạn muốn xóa tất cả ?")){
        localStorage.setItem(myStore.state.semester, JSON.stringify([]))
        myStore.dispatch({ type: SetClear })
      }
    }
  }
}

export { actionAddWithRender, actionDeleteWithRender, actionDeleteAll }