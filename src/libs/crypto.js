import CryptoJS from "crypto-js";

function decrypt(data){
  return CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8)
}

function encrypt(data){
  return CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRET_KEY)
}

export { decrypt, encrypt }