import axios from "axios"

const axiosConfig = () => {
  if(process.env.REACT_APP_NODE_ENV === "dev"){
    return axios.create({
      baseURL: process.env.REACT_APP_SERVER_DEV,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_PRO,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export default axiosConfig