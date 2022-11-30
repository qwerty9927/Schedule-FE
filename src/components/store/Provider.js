import { useReducer } from "react"
import Context from "./Context"
import { ResetResultSearchHandled, SetClear, SetCounter, SetResultSearch, SetResultSearchHandled, SetSemester, SetTableValue } from './Constant'
import { initTable } from "../service/HandleAction"

function Provider({ children }) {

  const initialState = () => {
    const currentSemester = localStorage.getItem("currentSemester")
    const table = initTable(currentSemester)
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
      tableValue: table,
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

  const reducer = (state, action) => {
    switch (action.type) {
      case SetResultSearch:
        return { ...state, resultSearch: action.payload, resultSearchHandled: handleResultSearch(state, action.payload) }
      case SetResultSearchHandled:
        return { ...state, resultSearchHandled: handleResultSearch(state, action.payload) }
      case SetTableValue:
        return { ...state, tableValue: action.payload }
      case SetCounter:
        return { ...state, counter: action.payload }
      case SetSemester:
        localStorage.setItem("currentSemester", action.payload)
        return initialState()
      case SetClear:
        const initial = initialState()
        return { ...initial, resultSearch: state.resultSearch, resultSearchHandled: handleResultSearch(initial, state.resultSearchHandled) }
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
