import axios from "axios";

const instance = axios.create({
  baseURL: "https://real-ruby-beetle-boot.cyclic.app/",
  // baseURL: "https://api-schedule-app.herokuapp.com/",
  // baseURL: "http://localhost:5000/",
  // baseURL: "http://192.168.0.107:5000/",
  headers: {
    "Content-Type": "application/json"
  }
  // ,
  // withCredentials: true
})

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject();
})

export default instance