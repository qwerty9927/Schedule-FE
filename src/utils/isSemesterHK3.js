
export default (semester) => {
  return semester ? semester.split("_")[0] === "HK3" : false
}