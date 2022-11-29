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
  const startLessonInTheAfternoon = 6
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
    if ((TBD === startLessonInTheMorning && timeInDay[indexForTKT + 1] === CS) // Là tiết đầu tiên có cùng cơ sở với tiết sau đó
      || timeInDay[indexForTKT + 1] === 0
      || timeInDay[indexForTBD - 1] === CS // tiết trước đó có cùng cơ sở hay không
      || timeInDay[indexForTBD - 1] === 0 // trước nó chưa có tiết nào
      || TBD === afterBreakTimeInTheMorning
      || TKT === beforeBreakTimeInTheMorning
    ) {
      for (i; i < TKT; i++) {
        if (timeInDay[i] !== 0) {
          throw new Error("Khác cơ sở hoặc học phần bị trùng lịch")
        }
      }
    } else {
      throw new Error("Khác cơ sở hoặc học phần bị trùng lịch")
    }
  } else {
    if ((TBD === startLessonInTheAfternoon && timeInDay[indexForTKT + 1] === CS)
      || timeInDay[indexForTKT + 1] === 0
      || timeInDay[indexForTBD - 1] === CS
      || timeInDay[indexForTBD - 1] === 0
      || TBD === afterBreakTimeInTheAfternoon
      || TKT === beforeBreakTimeInTheAfternoon
    ) {
      for (i; i < TKT; i++) {
        if (timeInDay[i] !== 0) {
          throw new Error("Khác cơ sở hoặc học phần bị trùng lịch")
        }
      }
    } else {
      throw new Error("Khác cơ sở hoặc học phần bị trùng lịch")
    }
  }

  return timeInDay.fill(CS, indexForTBD, TKT)
}

function createNewArrayFromListEmptyTime(oldArr){
  return oldArr.map(item => ({...item}))
}

function isExistSubject(ListSubjectRegistered, MaMH) {
  ListSubjectRegistered.forEach(item => {
    if (item.MaMH === MaMH) {
      throw new Error("Môn học đã tồn tại")
    }
  })
}

function reMakeArrTuan(Tuan){
  const newArr = []
  Tuan.forEach(rootItem => {
    const subArr = []
    for(let i = 0;i < rootItem.length;i++){
      if(rootItem[i] !== '-'){
        subArr.push(i)
      }
    }
    newArr.push(subArr)
  })
  return newArr
}

function mergeArrTuan(Tuan){
  const newArr = []
  Tuan.forEach(rootItem => {
    rootItem.forEach(item => {
      newArr.push(item)
    })
  })
  return new Set(newArr)
}

function handleSubjectInfo(subjectInfo){
  let Thu = new Set(subjectInfo.Thu)
  let TBD = new Set(subjectInfo.TBD)
  let Tuan = new Set(subjectInfo.Tuan)
  if(Thu.size === 1 && TBD.size === 1 && Tuan.size === 1){
    subjectInfo.Thu = Array.from(Thu)
    subjectInfo.TBD = Array.from(TBD)
    subjectInfo.Tuan = Array.from(Tuan)
  }
  return subjectInfo
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
  } = handleSubjectInfo({...subjectInfo})

  

  try {
    const table = JSON.parse(localStorage.getItem(myStore.state.semester)) || (new Structure()).getBaseStructure()
    isExistSubject(table.ListSubjectRegistered, MaMH)
    const tempListEmptyTime = createNewArrayFromListEmptyTime(table.ListEmptyTime)
    const newTuan = reMakeArrTuan(Tuan)
    newTuan.forEach((rootItem, rootIndex) => {
      rootItem.forEach((item, index) => {
        const result = checkSlot(Thu[rootIndex], TBD[rootIndex], ST[rootIndex], CS[rootIndex], tempListEmptyTime[item])
        tempListEmptyTime[item][`${Thu[rootIndex]}`] = result
      })
    })

    // Ghi vao store
    mergeArrTuan(newTuan).forEach((item, index) => {
        if(table.ListSchedule[item] === null){
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
    localStorage.setItem(myStore.state.semester, JSON.stringify(table))
  } catch (err) {
    throw err.message
  }
}

function changeEmptyTime(subjectInfo, listEmptyTime){
  const Tuan = reMakeArrTuan(subjectInfo.Tuan)
  Tuan.forEach((rootItem, index) => {
    rootItem.forEach(item => {
      const TKT = subjectInfo.TBD[index] + subjectInfo.ST[index] - 1
      listEmptyTime[item][`${subjectInfo.Thu[index]}`].fill(0, subjectInfo.TBD[index] - 1, TKT)
    })    
  })
  return listEmptyTime
}

function changeSchedule(subjectInfo, listSchedule){
  const Tuan = mergeArrTuan(reMakeArrTuan(subjectInfo.Tuan))
  Tuan.forEach((rootItem, rootIndex) => {
    listSchedule[rootItem] = listSchedule[rootItem].filter((item, index) => {
      if(item.MaMH !== subjectInfo.MaMH){
        return true
      }
    })
  })
  return listSchedule
}

function changeSubjectRegister(subjectInfo, listSubjectRegistered){
  listSubjectRegistered = listSubjectRegistered.filter(item => {
    if(subjectInfo.MaMH !== item.MaMH){
      return true
    }
  })
  return listSubjectRegistered
}



function actionDelete(myStore, subjectInfo) {
  try {
    const table = JSON.parse(localStorage.getItem(myStore.state.semester))
    // Delete empty time
    const emptyTime = changeEmptyTime(subjectInfo, table.ListEmptyTime)
    // Delete schedule
    const schedule = changeSchedule(subjectInfo, table.ListSchedule) 
    // Delete subject
    const subject = changeSubjectRegister(subjectInfo, table.ListSubjectRegistered)
    localStorage.setItem(myStore.state.semester, JSON.stringify({ 
      ListEmptyTime: emptyTime, 
      ListSchedule: schedule, 
      ListSubjectRegistered: subject 
    }))
  } catch (err) {
    throw err
  }
}

export { actionAdd, actionDelete, reMakeArrTuan }
