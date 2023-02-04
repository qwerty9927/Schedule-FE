export default (data) => {
  if(Array.isArray(data)){
    return data.map(item => {
      switch (item) {
        case 2:
          return "Hai"
        case 3:
          return "Ba"
        case 4:
          return "Tư"
        case 5:
          return "Năm"
        case 6:
          return "Sáu"
        case 7:
          return "Bảy"
      }
    })
  } else {
    let result
    switch (data) {
      case 2:
        result = "Hai"
        break
      case 3:
        result = "Ba"
        break
      case 4:
        result = "Tư"
        break
      case 5:
        result = "Năm"
        break
      case 6:
        result = "Sáu"
        break
      case 7:
        result = "Bảy"
        break
    }
    return [result]
  }
}