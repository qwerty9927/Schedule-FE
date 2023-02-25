function stringToArrayOfWeek (arrayString) {
  const newArray = []
  arrayString.forEach(rootItem => {
    const subArray = []
    for (let i = 0; i < rootItem.length; i++) {
      if (rootItem[i] !== '-') {
        subArray.push(i)
      }
    }
    newArray.push(subArray)
  })
  return newArray
}

function mergeWeek(Tuan) {
  let newArr = []
  Tuan.forEach(item => {
    newArr = [...newArr, ...item]
  })
  return Array.from(new Set(newArr))
}

function handleConfilctStructure(subjectInfo) {
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

function reCount(ListSubjectRegistered) {
  const subjectRegistered = ListSubjectRegistered || []
  let count = 0
  subjectRegistered.forEach(item => {
    count += item.STC
  });
  return count
}

export {
  mergeWeek,
  handleConfilctStructure,
  stringToArrayOfWeek,
  reCount
}