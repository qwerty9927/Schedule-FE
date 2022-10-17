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
    if (item === MaMH) {
      throw new Error("Subject existed")
    }
  })
}

function unConflict(arr){
  return [...(new Set(arr))].map(item => item.replace('-',''))
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
    ListSchedule: new Array(numberOfSchoolWeeks),
    ListEmptyTime: new Array(numberOfSchoolWeeks).fill(EmptyTime),
    ListSubjectRegistered: []
  }
  try {
    let i, j, k, z
    const table = JSON.parse(localStorage.getItem("table")) || baseStructure
    isExistSubject(table.ListSubjectRegistered, MaMH)
    const tempListEmptyTime = createNewArrayFromListEmptyTime(table.ListEmptyTime)
    Tuan = unConflict(Tuan)
    console.log(Tuan)
    for(i = 0;i < Tuan.length;i++){
      if(Tuan[i].includes("0")){
        for(j = 0;j < Tuan[i].length;j++){
          if(Tuan[i][j] !== '-'){
            if(Tuan[i].indexOf(`${Tuan[i][j]}`, j) >= Tuan[i].indexOf('0')) {
              const result = checkSlot(Thu[i], TBD[i], ST[i], CS[i], table.ListEmptyTime[parseInt(Tuan[i][j]) + week2Digit])
              tempListEmptyTime[j][`${Thu[i]}`] = result
            } else {
              const result = checkSlot(Thu[i], TBD[i], ST[i], CS[i], table.ListEmptyTime[parseInt(Tuan[i][j])])
              tempListEmptyTime[j][`${Thu[i]}`] = result
            }
          }
        }
      } else {
        for(k = 0;k < Tuan[i].length;k++){
          if(Tuan[i][k] !== '-'){
            const result = checkSlot(Thu[i], TBD[i], ST[i], CS[i], table.ListEmptyTime[parseInt(Tuan[i][k])])
            tempListEmptyTime[j][`${Thu[i]}`] = result
          }
        }
      }
    }
    table.ListEmptyTime = tempListEmptyTime
    table.ListSubjectRegistered.push(MaMH)

    // Ghi vao store
    Tuan.forEach((item) => {
      for(z = 0;z < item.length;z++){
        if(table.ListSchedule[z] === undefined){
          table.ListSchedule[z] = new Array
        }
        table.ListSchedule[z].push({
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
      }
    })
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
