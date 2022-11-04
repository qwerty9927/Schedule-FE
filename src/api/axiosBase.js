import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json"
  }
})

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
})

export default instance