const numberOfSchoolWeeks = 15
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
          throw new Error(`Different area or Conflict error`)
        }
      }
    } else {
      throw new Error("Different area or Conflict error")
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
          throw new Error("Different area or Conflict error")
        }
      }
    } else {
      throw new Error("Different area or Conflict error")
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
      throw new Error("Subject existed")
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

function actionAdd(subjectInfo) {
  const week2Digit = 10 - 1
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
  } = subjectInfo

  const EmptyTime = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  }

  const baseStructure = {
    ListSchedule: new Array(numberOfSchoolWeeks).fill(null),
    ListEmptyTime: new Array(numberOfSchoolWeeks).fill(EmptyTime),
    ListSubjectRegistered: []
  }
  try {
    const table = JSON.parse(localStorage.getItem("table")) || baseStructure
    isExistSubject(table.ListSubjectRegistered, MaMH)
    const tempListEmptyTime = createNewArrayFromListEmptyTime(table.ListEmptyTime)
    Tuan = reMakeArrTuan(Tuan)
    Tuan.forEach((rootItem, rootIndex) => {
      rootItem.forEach((item, index) => {
        const result = checkSlot(Thu[rootIndex], TBD[rootIndex], ST[rootIndex], CS[rootIndex], table.ListEmptyTime[item])
        tempListEmptyTime[item][`${Thu[rootIndex]}`] = result
      })
    })

    // Ghi vao store
    mergeArrTuan(Tuan).forEach((item, index) => {
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
          ST,
          CS,
        })
      })
    table.ListEmptyTime = tempListEmptyTime
    table.ListSubjectRegistered.push({MaMH, NMH, TTH})
    console.log(table)
    localStorage.setItem("table", JSON.stringify(table))
    return true
  } catch (err) {
    console.log(err)
    alert(err.message)
    return false
  }
}

function changeEmptyTime(MaMH, schedule, timeArr) {
  const newSchedule = schedule.filter(rootItem => {
    if (rootItem.MaMH === MaMH) {
      rootItem.Thu.forEach((item, index) => {
        timeArr[item].fill(0, rootItem.TBD[index] - 1, rootItem.TBD[index] - 1 + rootItem.ST[index])
      })
    } else {
      return true
    }
  })
  return { newSchedule, timeArr }
}

function actionDelete(subjectInfo) {
  try {
    const table = JSON.parse(localStorage.getItem("table"))
    const result = changeEmptyTime(subjectInfo.MaMH, table.Schedule, table.EmptyTime)
    localStorage.setItem("table", JSON.stringify({ Schedule: result.newSchedule, EmptyTime: result.timeArr }))
  } catch (err) {
    throw err
  }
}

export { actionAdd, actionDelete }
