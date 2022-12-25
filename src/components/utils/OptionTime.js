import Structure from "./Structure"

function OptionTime({style, setOption}) {
  const handleOption = (e) => {
    setOption(e.target.value - 1)
  }

  return (
    <div className={style.option_time}>
      <label htmlFor="">Tuần:</label>
      <select name="" id={style.week} onChange={(e) => handleOption(e)}>
        {(new Array((new Structure).getNumberOfSchoolWeeks()).fill(0)).map((item, index) => {
          return (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default OptionTime