import { useReducer } from "react"
import Context from "./Context"
import { SetResultSearch, SetTableValue } from './Constant'

function Provider({ children }) {
  const initialState = {
    resultSearch: [],
    tableValue: JSON.parse(localStorage.getItem('table')) || {}
  }

  const handleResultSearch = (state, resultSearch) => {
    // console.log(state.tableValue.Schedule)
    const subjectRegistered = state.tableValue.ListSubjectRegistered ? [...state.tableValue.ListSubjectRegistered] : []
    const result =  resultSearch.map(rootItem => {
      for(let i = 0;i < subjectRegistered.length;i++){
        if(rootItem.MaMH === subjectRegistered[i].MaMH && rootItem.NMH === subjectRegistered[i].NMH && rootItem.TTH === subjectRegistered[i].TTH){
          subjectRegistered.splice(i, 1)
          return { ...rootItem, choice: true}
        }
      }
      return { ... rootItem, choice: false}
    })
    return result
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case SetResultSearch:
        return { ...state, resultSearch: handleResultSearch(state, action.payload)
        }
      case SetTableValue:
        return { ...state, tableValue: action.payload }
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
  )
}

export default Provider
