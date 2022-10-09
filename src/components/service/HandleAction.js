
function checkArray(arr){
  let subArr = arr
  if (!subArr.length) {
    subArr = new Array(14).fill(0)
  }
  return subArr
}

function indexConflict(THU, TBD, ST, Phong){
  for(let i = 0;i < THU.length - 1;i++){
    if(THU[i] === THU[i + 1] && TBD[i] === TBD[i + 1] && ST[i] !== ST[i + 1]){
      return ST.indexOf(Math.min(ST[i], ST[i + 1]))
    }
  }

  return null
}

function checkSlot(THU, TBD, ST, CS, Phong, timeArr) {
  const pivot = 5 // Chia khung giờ
  const startLessonInTheMorning = 1
  const startLessonInTheAfternoon = 6
  const beforeBreakTimeInTheMorning = 2
  const afterBreakTimeInTheMorning = 3
  const beforeBreakTimeInTheAfternoon = 7
  const afterBreakTimeInTheAfternoon = 8

  const index = indexConflict(THU, TBD, ST, Phong);
  if(Number.isInteger(index)){
   THU.splice(index, 1)
   ST.splice(index, 1)
   TBD.splice(index, 1)
   Phong.splice(index, 1)
  }

  // console.log(THU, TBD, ST)

  let countDay = 0
  THU.forEach((item, index) => {
    const indexForTBD = TBD[index] - 1
    let i = indexForTBD
    let timeInDay = checkArray(timeArr[`${item}`])
    const TKT = TBD[index] + ST[index] - 1
    const indexForTKT = TKT - 1
    if (TKT <= pivot) {
      if ((TBD[index] === startLessonInTheMorning && timeInDay[indexForTKT + 1] === CS[index]) // Là tiết đầu tiên có cùng cơ sở với tiết sau đó
        || timeInDay[indexForTKT + 1] === 0
        || timeInDay[indexForTBD - 1] === CS[index] // tiết trước đó có cùng cơ sở hay không
        || timeInDay[indexForTBD - 1] === 0 // trước nó chưa có tiết nào
        || TBD[index] === afterBreakTimeInTheMorning
        || TKT === beforeBreakTimeInTheMorning
      ) {
        for (i; i < TKT; i++) {
          if (timeInDay[i] !== 0) {
            throw new Error("Different area or Conflict error")
          }
        }
        countDay++
      } else {
        throw new Error("Different area or Conflict error")
      }
    } else {
      if ((TBD[index] === startLessonInTheAfternoon && timeInDay[indexForTKT + 1] === CS[index])
        || timeInDay[indexForTKT + 1] === 0
        || timeInDay[indexForTBD - 1] === CS[index]
        || timeInDay[indexForTBD - 1] === 0
        || TBD[index] === afterBreakTimeInTheAfternoon
        || TKT === beforeBreakTimeInTheAfternoon
      ) {
        for (i; i < TKT; i++) {
          if (timeInDay[i] !== 0) {
            throw new Error("Different area or Conflict error")
          }
        }
        countDay++
      } else {
        throw new Error("Different area or Conflict error")
      }
    }
    
    if(countDay === THU.length){
      THU.forEach((item, index) => {
        const indexForTBD = TBD[index] - 1
        const TKT = TBD[index] + ST[index] - 1
        timeArr[`${item}`] = checkArray(timeArr[`${item}`]).fill(CS[index], indexForTBD, TKT)
      })
    }
  })
  return {THU, TBD, ST, CS, Phong, timeArr }
}

function isExistSubject(scheduleInfo, MaMH) {
  scheduleInfo.forEach(item => {
    if(item.MaMH === MaMH){
      throw new Error("Subject existed")
    }
  })
}

function actionAdd(subjectInfo){
  let {
    MaMH,
    TenMH,
    NMH,
    STC,
    Thu,
    TBD,
    Phong,
    GiangVien,
    ST,
    CS,
  } = subjectInfo

  const baseStructure = {
    Schedule: [],
    EmptyTime: {
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: []
    }
  }
  try {
    const table = JSON.parse(localStorage.getItem("table")) || baseStructure
    isExistSubject(table.Schedule, MaMH)
    const result = checkSlot([...Thu], [...TBD], [...ST], [...CS], [...Phong], table.EmptyTime)
    table.EmptyTime = result.timeArr
    Thu = result.THU
    TBD = result.TBD
    Phong = result.Phong
    ST = result.ST
    table.Schedule.push({
      MaMH,
      TenMH,
      NMH,
      STC,
      Thu,
      TBD,
      Phong,
      GiangVien,
      ST,
      CS,
    })
    console.log(table)
    localStorage.setItem("table", JSON.stringify(table))
    return true
  } catch(err){
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
  return {newSchedule, timeArr}
}

function actionDelete(subjectInfo) {
  try {
    const table = JSON.parse(localStorage.getItem("table"))
    const result = changeEmptyTime(subjectInfo.MaMH, table.Schedule, table.EmptyTime)
    localStorage.setItem("table", JSON.stringify({Schedule: result.newSchedule, EmptyTime: result.timeArr}))
  } catch (err) {
    throw err
  }
}

export { actionAdd, actionDelete }