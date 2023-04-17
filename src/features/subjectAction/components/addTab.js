import { toast } from "react-toastify"
import { v4 } from "uuid"
import message from "../../../data/toastMessage"
import { encrypt } from "../../../libs/crypto"
import { SetNewTabs } from "../../../data/constantProvider"

function actionAddTab(myStore, name = "New tab") {
  if (myStore.state.semester) {
    if(myStore.state.listTabs.length < 5){
      const string = v4()
      const tabsKey = "currentTabs" + "_" + myStore.state.semester 
      localStorage.setItem(tabsKey, string)
      localStorage.setItem(myStore.state.semester, JSON.stringify([...myStore.state.listTabs, {name, id: string}]))
      myStore.dispatch({ type: SetNewTabs })
    } else {
      toast.info(message.tabsInfo)
    }
  } else {
    toast.warn(message.schoolYearWarn)
  }
}

function actionImport(myStore, data) {
  if (data.semester === myStore.state.semester) {
    if(myStore.state.listTabs.length < 5){
      const string = v4()
      const tabsKey = "currentTabs" + "_" + myStore.state.semester 
      localStorage.setItem(tabsKey, string)
      localStorage.setItem(data.semester, JSON.stringify([...myStore.state.listTabs, {name: data.name, id: string}]))
      localStorage.setItem(string, encrypt(JSON.stringify(data.ListSubjectRegistered)))
      myStore.dispatch({ type: SetNewTabs })
    } else {
      toast.info(message.importInfo)
    }
  } else {
    toast.warn(message.importWarn(data.semester))
  }
}

export {
  actionAddTab,
  actionImport
}