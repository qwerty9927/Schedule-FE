import { useReducer } from "react"
import { v4 } from "uuid"
import Context from "./Context"
import { CloseTabs, ResetResultSearchHandled, SelectTabs, SetClear, SetCounter, SetMajors, SetNewTabs, SetResultSearch, SetResultSearchHandled, SetSemester } from './Constant'
import { initTable } from "../service/HandleAction"
import { toast } from "react-toastify"
import message from "../utils/toastMessage"

function Provider({ children }) {

  const initialState = () => {
    if(!localStorage.getItem("vs")){
      localStorage.clear()
      localStorage.setItem("vs", "2.1")
    } else if(localStorage.getItem("vs") === "2.0") {
      localStorage.clear()
      localStorage.setItem("vs", "2.1")
      alert("Vì lý do các học phần có chút thay đổi về phòng học. Dẫn đến thời khóa biểu hiện tại đã sai. Hãy chọn lại các học phần đó một nữa. \nXin lỗi vì sự bất tiện này!")
    }
    const currentSemester = localStorage.getItem("currentSemester")
    const listTabs = JSON.parse(localStorage.getItem(currentSemester)) || []
    const tabsKey = "currentTabs" + "_" + currentSemester 
    const currentTabs = localStorage.getItem(tabsKey)
    const majorsKey = "currentMajors" + "_" + currentSemester 
    const majors = localStorage.getItem(majorsKey)
    let table = {}
    try {
      table = initTable(currentTabs)
    } catch(err){
     
    }
    const counter = () => { 
      const subjectRegistered = table.ListSubjectRegistered || []
      let count = 0
      subjectRegistered.forEach(item => {
        count += item.STC
      });
      return count
    }
    return {
      resultSearch: [],
      resultSearchHandled: [],
      semester: currentSemester,
      majors: majors,
      tableValue: table,
      listTabs: listTabs,
      tabs: currentTabs,
      counter: counter()
    }
  }


  const handleResultSearch = (state, resultSearch) => {
    const subjectRegistered = state.tableValue.ListSubjectRegistered ? [...state.tableValue.ListSubjectRegistered] : []
    const result = resultSearch.map(rootItem => {
      for (let i = 0; i < subjectRegistered.length; i++) {
        if (rootItem.MaMH === subjectRegistered[i].MaMH && rootItem.NMH === subjectRegistered[i].NMH && rootItem.TTH === subjectRegistered[i].TTH) {
          subjectRegistered.splice(i, 1)
          return { ...rootItem, choice: true }
        }
      }
      return { ...rootItem, choice: false }
    })
    return result
  }

  const setSemester = (action) => {
    localStorage.setItem("currentSemester", action.payload)
    const tabsKey = "currentTabs" + "_" + action.payload
    if (!localStorage.getItem(tabsKey) || !localStorage.getItem(action.payload)) {
      const string = v4()
      localStorage.setItem(tabsKey, string)
      localStorage.setItem(action.payload, JSON.stringify([{ name: action.payload, id: string }]))
    }
  }

  const closeTabs = (state, action) => {
    if (state.listTabs.length > 1) {
      if (state.tabs === action.payload) {
        const tabsKey = "currentTabs" + "_" + state.semester
        const index = state.listTabs.findIndex(item => {
          return item.id === action.payload
        })
        if (index === state.listTabs.length - 1) {
          localStorage.setItem(tabsKey, state.listTabs[index - 1].id)
        } else if (index >= 0) {
          localStorage.setItem(tabsKey, state.listTabs[index + 1].id)
        }
      }
      const newListTabs = state.listTabs.filter(item => {
        return item.id !== action.payload
      })
      localStorage.removeItem(action.payload)
      localStorage.setItem(state.semester, JSON.stringify(newListTabs))
      toast.success(message.closeTabsSuccess)
    } else {
      toast.info(message.closeTabsInfo)
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case SetResultSearch:
        return { ...state, resultSearch: action.payload, resultSearchHandled: handleResultSearch(state, action.payload) }
      case SetResultSearchHandled:
        return { ...state, resultSearchHandled: handleResultSearch(state, action.payload) }
      case SetSemester:
        setSemester(action)
        return initialState()
      case SetMajors:
        const majorsKey = "currentMajors" + "_" + state.semester 
        localStorage.setItem(majorsKey, action.payload)
        return initialState()
      case SetNewTabs:
        const initial_2 = initialState()
        return { ...initial_2, resultSearch: state.resultSearch, resultSearchHandled: handleResultSearch(initial_2, state.resultSearchHandled) }
      case SelectTabs:
        const tabsKey = "currentTabs" + "_" + state.semester 
        localStorage.setItem(tabsKey, action.payload)
        const initial_3 = initialState()
        return { ...initial_3, resultSearch: state.resultSearch, resultSearchHandled: handleResultSearch(initial_3, state.resultSearchHandled) }
      case CloseTabs:
        closeTabs(state, action)
        const initial_4 = initialState()
        return { ...initial_4, resultSearch: state.resultSearch, resultSearchHandled: handleResultSearch(initial_4, state.resultSearchHandled) }
      case SetCounter:
        return { ...state, counter: action.payload }
      case SetClear:
        const initial_1 = initialState()
        return { ...initial_1, resultSearch: state.resultSearch, resultSearchHandled: handleResultSearch(initial_1, state.resultSearchHandled) }
      case ResetResultSearchHandled:
        return { ...state, resultSearchHandled: handleResultSearch(state, state.resultSearch) }
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState())
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
