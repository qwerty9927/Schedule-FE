import { useReducer } from "react"
import { v4 } from "uuid"
import Context from "./Context"
import { CloseTabs, ResetResultSearchHandled, SelectTabs, SetClear, SetCounter, SetMajors, SetNewTabs, SetResultSearch, SetResultSearchHandled, SetSemester } from './Constant'
import { initTable } from "../service/HandleAction"
import { toast } from "react-toastify"

function Provider({ children }) {

  const initialState = () => {
    const currentSemester = localStorage.getItem("currentSemester")
    const listTabs = JSON.parse(localStorage.getItem(currentSemester)) || []
    const currentTabs = localStorage.getItem("currentTabs")
    const majors = localStorage.getItem("currentMajors")
    const table = initTable(currentTabs)
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
    if(!localStorage.getItem("currentTabs") || !localStorage.getItem(action.payload)){
      const string = v4()
      localStorage.setItem("currentTabs", string)
      localStorage.setItem(action.payload, JSON.stringify([{name:  action.payload, id: string}]))
    }
  }

  const closeTabs = (state, action) => {
    if(state.listTabs.length > 1){
      if(state.tabs === action.payload){
        const index = state.listTabs.findIndex(item => {
          return item.id === action.payload
        })
        if(index === state.listTabs.length - 1) {
          localStorage.setItem("currentTabs", state.listTabs[index - 1].id)
        } else if(index >= 0){
          localStorage.setItem("currentTabs", state.listTabs[index + 1].id)
        } 
      }
      const newListTabs = state.listTabs.filter(item => {
        return item.id !== action.payload
      })
      localStorage.removeItem(action.payload)
      localStorage.setItem(state.semester, JSON.stringify(newListTabs))
      toast.success("Xoa tab thanh cong")
    } else {
      toast.info("Tab nay khong xoa duoc")
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
        localStorage.setItem("currentMajors", action.payload)
        return initialState()
      case SetNewTabs:
        const initial_2 = initialState()
        return { ...initial_2, resultSearch: state.resultSearch, resultSearchHandled: handleResultSearch(initial_2, state.resultSearchHandled) }
      case SelectTabs:
        localStorage.setItem("currentTabs", action.payload)
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
