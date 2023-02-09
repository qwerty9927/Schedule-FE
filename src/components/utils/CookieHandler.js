import axiosBase from "#api/axiosBase"

class CookieHandler {
  async getCookie(name){
    return await axiosBase.get(`api/auth/getCookie?name=${name}`)
  }
}

export default new CookieHandler()