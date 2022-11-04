import { SetResultSearch, SetTableValue } from '../store/Constant'
import { actionAdd, actionDelete } from '../service/HandleAction'
import { toast } from 'react-toastify'
function actionDeleteWithRender(myStore, subjectInfo) {
  actionDelete(subjectInfo)
  const result = myStore.state.resultSearch.map(item => {
    if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
      return { ...item, choice: false }
    }
    return { ...item }
  })
  myStore.dispatch({ type: SetTableValue, payload: JSON.parse(localStorage.getItem("table")) })
  myStore.dispatch({ type: SetResultSearch, payload: result })
  toast.success("Remove subject success 😎")
}

function actionAddWithRender(myStore, subjectInfo) {
  try {
    actionAdd(subjectInfo)
    myStore.dispatch({ type: SetTableValue, payload: JSON.parse(localStorage.getItem("table")) })
    const result = myStore.state.resultSearch.map(item => {
      if (item.MaMH === subjectInfo.MaMH && item.NMH === subjectInfo.NMH) {
        return { ...item, choice: true }
      }
      return { ...item }
    })
    myStore.dispatch({ type: SetResultSearch, payload: result })
    toast.success("Add subject success 😊")
  } catch (err) {
    toast.error(err)
  }
}

export { actionAddWithRender, actionDeleteWithRender }