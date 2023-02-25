import { createContext, useContext, useReducer } from "react";
import { SelectNavigate } from "../data/constantProviderNavigate";
const Context = createContext();

function NavigateProvider({ children }) {
  const initialState = {
    navigate: parseInt(localStorage.getItem("currentNavigate")) || 1
  }
  const reducer = (state, action) => {
    switch(action.type){
      case SelectNavigate:
        return {...state, navigate: action.payload}
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default NavigateProvider

export function NavigateConsumer () {
  return useContext(Context)
}
