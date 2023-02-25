import constantConfig from "../data/constantConfig"

function OptionTimeStatic({style, setOption}) {
  const handleOption = (e) => {
    setOption(e.target.value - 1)
  }

  return (
    <div className={style.option_time}>
      <label htmlFor="">Tuần:</label>
      <select name="" id={style.week} onChange={(e) => handleOption(e)}>
        {(new Array(constantConfig.numberOfSchoolWeeks).fill(0)).map((item, index) => {
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

export default OptionTimeStatic