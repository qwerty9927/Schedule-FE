import { createContext, useContext, useEffect, useState } from "react"
import axios from "../libs/axios"
import CryptoJS from "crypto-js"

const authContext = createContext()

function useAuth(){
  const [ authed, setAuthed ] = useState(() => {
    try {
      return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("isAuthed"), process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8))
    } catch(err){
      return false
    }
  })

  const callApiLogin = async (data) => {
    return await axios.post("api/auth/login", {
      ...data
    })
  }

  const callApiLogout = async () => {
    return await axios.get("api/auth/logout")
  }

  return {
    authed,
    async login(data){
      return new Promise(resolve => {
        localStorage.setItem("isAuthed", CryptoJS.AES.encrypt("true", process.env.REACT_APP_SECRET_KEY))
        setAuthed(true)
        resolve(callApiLogin(data))
      })
    },
    logout(){
      return new Promise(resolve => {
        setAuthed(false)
        resolve(callApiLogout())
      })
    }
  }
}

export function AuthProvider ({ children }){
  return <authContext.Provider value={ useAuth() }>
    {children}
  </authContext.Provider>
}

export default function AuthConsumer (){
  return useContext(authContext)
}