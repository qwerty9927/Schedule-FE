
function CustomToast({closeToast, toastProps, meg}){
  console.log(toastProps)
  return (
    <>
      <div>{meg}</div>
      <div>
        <button>Ok</button>
        <button>Cancel</button>
      </div>
    </>
  )
}

export default CustomToast