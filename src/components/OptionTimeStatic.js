import constantConfig from "../data/constantConfig"
import style from "../assets/css/userScreen/optionTimeStatic.module.css"
import checkSemester from "../utils/checkSemester"

function OptionTimeStatic({setOption, myStore}) {
  const handleOption = (e) => {
    setOption(e.target.value - 1)
  }

  return (
    <div className={style.option_time}>
      <label htmlFor="">Tuần:</label>
      <select name="" id={style.week} onChange={(e) => handleOption(e)}>
        {(new Array(checkSemester(myStore.state.semester) ? constantConfig.numberOfSchoolWeeksHK3 : constantConfig.numberOfSchoolWeeks).fill(0)).map((item, index) => {
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