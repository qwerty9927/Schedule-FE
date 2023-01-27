import CryptoJS from "crypto-js"
import Structure from "../utils/Structure"

function checkArray(arr) {
  let subArr = arr
  if (!subArr.length) {
    subArr = new Array(14).fill(0)
  }
  return subArr
}

function checkSlot(THU, TBD, ST, CS, timeArr) {
  const pivot = 5 // Chia khung giờ
  const startLessonInTheMorning = 1
  const endLessonInMorning = 5
  const startLessonInTheAfternoon = 6
  const endLessonInAfternoon = 14
  const beforeBreakTimeInTheMorning = 2
  const afterBreakTimeInTheMorning = 3
  const beforeBreakTimeInTheAfternoon = 7
  const afterBreakTimeInTheAfternoon = 8

  const indexForTBD = TBD - 1
  let i = indexForTBD
  let timeInDay = checkArray(timeArr[`${THU}`])
  const TKT = TBD + ST - 1
  const indexForTKT = TKT - 1
  if (TKT <= pivot) {
    for (i; i < TKT; i++) {
      if (timeInDay[i] !== 0) {
        throw { meg: "Học phần trùng lịch vào", specialMeg: `"Thứ ${THU}"` }
      }
    }

    // Nếu TBD là điểm (1 hay 3) và timeInDay là (CS hay 0) thì vượt qua "Khác cơ sở"
    if (
      ((TBD !== startLessonInTheMorning && TBD !== afterBreakTimeInTheMorning)
        && (timeInDay[indexForTBD - 1] !== CS && timeInDay[indexForTBD - 1] !== 0))
      || ((TKT !== beforeBreakTimeInTheMorning && TKT !== endLessonInMorning)
        && (timeInDay[indexForTKT + 1] !== CS && timeInDay[indexForTKT + 1] !== 0))
    ) {
      throw { meg: "Khác cơ sở vào", specialMeg: `"Thứ ${THU}"` }
    }

  } else {
    for (i; i < TKT; i++) {
      if (timeInDay[i] !== 0) {
        throw { meg: "Học phần trùng lịch vào", specialMeg: `"Thứ ${THU}"` }
      }
    }

    // Nếu TKT là điểm (1 hay 3) và timeInDay là (CS hay 0) thì vượt qua "Khác cơ sở"
    if (
      ((TBD !== startLessonInTheAfternoon && TBD !== afterBreakTimeInTheAfternoon)
        && (timeInDay[indexForTBD - 1] !== CS && timeInDay[indexForTBD - 1] !== 0))
      || ((TKT !== beforeBreakTimeInTheAfternoon && TKT !== endLessonInAfternoon)
        && (timeInDay[indexForTKT + 1] !== CS && timeInDay[indexForTKT + 1] !== 0))
    ) {
      throw { meg: "Khác cơ sở vào", specialMeg: `"Thứ ${THU}"` }
    }
  }

  return timeInDay.fill(CS, indexForTBD, TKT)
}

function clearEmptyTimeTemp(table, subjectInfo) {
  table.ListSubjectRegistered.forEach(item => {
    if (item.MaMH === subjectInfo.MaMH) {
      actionDeleteTemp(table, item)
    }
  })
}

function reMakeArrTuan(Tuan) {
  const newArr = []
  Tuan.forEach(rootItem => {
    const subArr = []
    for (let i = 0; i < rootItem.length; i++) {
      if (rootItem[i] !== '-') {
        subArr.push(i)
      }
    }
    newArr.push(subArr)
  })
  return newArr
}

function mergeArrTuan(Tuan) {
  let newArr = []
  Tuan.forEach(item => {
    newArr = [...newArr, ...item]
  })
  return Array.from(new Set(newArr))
}

function confilctTimeTeachWithManyInstructors(subjectInfo) {
  // let Thu = new Set(subjectInfo.Thu)
  // let TBD = new Set(subjectInfo.TBD)
  // let Tuan = new Set(subjectInfo.Tuan)
  // console.log("Thu: ", Thu)
  // console.log("TBD: ", TBD)
  // console.log("Tuan: ", Tuan)
  // if(Thu.size == TBD.size == Tuan.size){
  //   subjectInfo.Thu = Array.from(Thu)
  //   subjectInfo.TBD = Array.from(TBD)
  //   subjectInfo.Tuan = Array.from(Tuan)
  // }
  // return subjectInfo
  
  let masterArr = []
  let Thu = []
  let TBD = []
  let Tuan = []
  for(let i = 0;i < subjectInfo.Thu.length;i++){
    masterArr = subjectInfo.Thu.map((item, index) => {
      return `${item}; ${subjectInfo.TBD[index]}; ${subjectInfo.Tuan[index]}`
    })
  }
  (new Set(masterArr)).forEach(item => {
    const elementArr = item.split("; ")
    Thu.push(parseInt(elementArr[0]))
    TBD.push(parseInt(elementArr[1]))
    Tuan.push(elementArr[2])
  })
  subjectInfo.Thu = Thu
  subjectInfo.TBD = TBD
  subjectInfo.Tuan = Tuan
  return subjectInfo
}

function initTable(currentTabs) {
  try {
    const table = (new Structure).getBaseStructure()
    const cipher = localStorage.getItem(currentTabs)
    table.ListSubjectRegistered = cipher ? JSON.parse(CryptoJS.AES.decrypt(cipher, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8)) : []
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
      } = confilctTimeTeachWithManyInstructors({ ...item })

      const tempListEmptyTime = JSON.parse(JSON.stringify(table.ListEmptyTime))
      const newTuan = reMakeArrTuan(Tuan)
      newTuan.forEach((rootItem, rootIndex) => {
        rootItem.forEach((item, index) => {
          const result = checkSlot(Thu[rootIndex], TBD[rootIndex], ST[rootIndex], CS[rootIndex], tempListEmptyTime[item])
          tempListEmptyTime[item][`${Thu[rootIndex]}`] = result
        })
      })

      // Ghi vao store
      mergeArrTuan(newTuan).forEach((item, index) => {
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
    localStorage.setItem(currentTabs, CryptoJS.AES.encrypt(JSON.stringify([]), process.env.REACT_APP_SECRET_KEY))
    throw new Error()
  }
}

function actionAdd(myStore, subjectInfo) {
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
  } = confilctTimeTeachWithManyInstructors({ ...subjectInfo })

  try {
    const table = JSON.parse(JSON.stringify(myStore.state.tableValue))
    clearEmptyTimeTemp(table, subjectInfo)

    const newTuan = reMakeArrTuan(Tuan)
    newTuan.forEach((rootItem, rootIndex) => {
      rootItem.forEach((item, index) => {
        const result = checkSlot(Thu[rootIndex], TBD[rootIndex], ST[rootIndex], CS[rootIndex], table.ListEmptyTime[item])
        table.ListEmptyTime[item][`${Thu[rootIndex]}`] = result
      })
    })

    // Ghi vao store
    mergeArrTuan(newTuan).forEach((item, index) => {
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
    // table.ListEmptyTime = table.ListEmptyTime
    table.ListSubjectRegistered.push({
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

    // Set lại table mới cho tableValue
    myStore.state.tableValue = table

    //Thay đổi list subject registered trong localStorage
    localStorage.setItem(myStore.state.tabs, CryptoJS.AES.encrypt(JSON.stringify(table.ListSubjectRegistered), process.env.REACT_APP_SECRET_KEY))
  } catch (err) {
    throw err
  }
}

function changeEmptyTime(subjectInfo, listEmptyTime) {
  const Tuan = reMakeArrTuan(subjectInfo.Tuan)
  Tuan.forEach((rootItem, index) => {
    rootItem.forEach(item => {
      const TKT = subjectInfo.TBD[index] + subjectInfo.ST[index] - 1
      listEmptyTime[item][`${subjectInfo.Thu[index]}`].fill(0, subjectInfo.TBD[index] - 1, TKT)
    })
  })
  return listEmptyTime
}

function changeSchedule(subjectInfo, listSchedule) {
  const Tuan = mergeArrTuan(reMakeArrTuan(subjectInfo.Tuan))
  Tuan.forEach((rootItem, rootIndex) => {
    listSchedule[rootItem] = listSchedule[rootItem].filter((item, index) => {
      if (item.MaMH !== subjectInfo.MaMH) {
        return true
      }
    })
  })
  return listSchedule
}

function changeSubjectRegister(subjectInfo, listSubjectRegistered) {
  listSubjectRegistered = listSubjectRegistered.filter(item => {
    if (subjectInfo.MaMH !== item.MaMH) {
      return true
    }
  })
  return listSubjectRegistered
}

function actionDelete(myStore, subjectInfo) {
  try {
    const table = myStore.state.tableValue
    // Delete empty time
    const emptyTime = changeEmptyTime(subjectInfo, table.ListEmptyTime)
    // Delete schedule
    const schedule = changeSchedule(subjectInfo, table.ListSchedule)
    // Delete subject
    const subject = changeSubjectRegister(subjectInfo, table.ListSubjectRegistered)
    table.ListEmptyTime = emptyTime
    table.ListSchedule = schedule
    table.ListSubjectRegistered = subject
    localStorage.setItem(myStore.state.tabs, CryptoJS.AES.encrypt(JSON.stringify(subject), process.env.REACT_APP_SECRET_KEY))
  } catch (err) {
    throw err
  }
}

function actionDeleteTemp(table, subjectInfo) {
  try {
    // Delete empty time
    const emptyTime = changeEmptyTime(subjectInfo, table.ListEmptyTime)
    // Delete schedule
    const schedule = changeSchedule(subjectInfo, table.ListSchedule)
    // Delete subject
    const subject = changeSubjectRegister(subjectInfo, table.ListSubjectRegistered)
    table.ListEmptyTime = emptyTime
    table.ListSchedule = schedule
    table.ListSubjectRegistered = subject

  } catch (err) {
    throw err
  }
}

export { actionAdd, actionDelete, reMakeArrTuan, initTable }
