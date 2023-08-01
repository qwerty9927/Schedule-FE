import axiosConfig from "../configs/axiosConfig";

const instance = axiosConfig()

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject();
})

export default instance