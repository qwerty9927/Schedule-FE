
function checkArray(arr) {
  let subArr = arr
  if (!subArr.length) {
    subArr = new Array(14).fill(0)
  }
  return subArr
}

function verifySubject(THU, TBD, ST, CS, timeArr) {
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
  let timeInDay = checkArray(timeArr[`${THU}`]) // Mảng thời gian còn trống trong một ngày
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

export default verifySubject