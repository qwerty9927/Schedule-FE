import { stringToArrayOfWeek, handleConfilctStructure, mergeWeek } from "./handleSide"
import verifySubject from "./verifySubject"
import * as crypto from "../../../libs/crypto"
import Structure from "./Structure"

function validateSubject(currentTabs) {
  try {
    const table = (new Structure()).getBaseStructure()
    const cipher = localStorage.getItem(currentTabs)
    // table.ListSubjectRegistered = cipher ? JSON.parse(CryptoJS.AES.decrypt(cipher, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8)) : []
    table.ListSubjectRegistered = cipher ? JSON.parse(crypto.decrypt(cipher)) : []
    table.ListSubjectRegistered.forEach(item => {
      let {
        MaMH,
        TenMH,
        NMH,
        TTH,
        STC,
        Thu,
        TBD,
        Phong,
        GiangVien,
        ST,
        Tuan,
        CS,
      } = handleConfilctStructure({ ...item })

      const tempListEmptyTime = JSON.parse(JSON.stringify(table.ListEmptyTime))
      const newTuan = stringToArrayOfWeek(Tuan)
      newTuan.forEach((rootItem, rootIndex) => {
        rootItem.forEach((item, index) => {
          const result = verifySubject(Thu[rootIndex], TBD[rootIndex], ST[rootIndex], CS[rootIndex], tempListEmptyTime[item])
          tempListEmptyTime[item][`${Thu[rootIndex]}`] = result
        })
      })

      // Ghi vao store
      mergeWeek(newTuan).forEach((item, index) => {
        if (table.ListSchedule[item] === null) {
          table.ListSchedule[item] = new Array()
        }
        table.ListSchedule[item].push({
          MaMH,
          TenMH,
          NMH,
          STC,
          TTH,
          Thu,
          TBD,
          Phong,
          GiangVien,
          Tuan,
          ST,
          CS
        })
      })
      table.ListEmptyTime = tempListEmptyTime
    })
    return table
  } catch (err) {
    console.log(err)
    // localStorage.setItem(currentTabs, CryptoJS.AES.encrypt(JSON.stringify([]), process.env.REACT_APP_SECRET_KEY))
    localStorage.setItem(currentTabs, crypto.encrypt(JSON.stringify([])))
    throw new Error()
  }
}

export default validateSubject