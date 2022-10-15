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
    const schedule = state.tableValue.Schedule ? [...state.tableValue.Schedule] : []
    const result =  resultSearch.map(rootItem => {
      for(let i = 0;i < schedule.length;i++){
        if(rootItem.MaMH === schedule[i].MaMH && rootItem.NMH === schedule[i].NMH && rootItem.TTH === schedule[i].TTH){
          schedule.splice(i, 1)
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
        // console.log(state)
        return { ...state, resultSearch: handleResultSearch(state, action.payload)}
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
