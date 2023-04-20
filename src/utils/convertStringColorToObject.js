
export default (string) => {
  const arr = string.split(',')
  return { r: parseInt(arr[0]), g: parseInt(arr[1]), b: parseInt(arr[2])}
}