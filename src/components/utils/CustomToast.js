
function CustomToast({closeToast, toastProps, err}){
  return (
    <>
      <div>{err.meg} <span style={{fontWeight: "bold", fontStyle: "italic"}}>{err.specialMeg}</span></div>
    </>
  )
}

export default CustomToast