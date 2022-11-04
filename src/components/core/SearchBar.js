import { useContext, useEffect, useState } from "react"
import axiosBase from "../../api/axiosBase"
import Context from "../store/Context"
import { SetResultSearch } from '../store/Constant'
import { toast } from "react-toastify"

function SearchBar() {
  const [formValue, setFormValue] = useState({})
  const [school, setSchool] = useState([])
  const [schoolYear, setSchoolYear] = useState([])
  const myStore = useContext(Context)

  const callApiSearch = async () => {
    return await axiosBase.get("api/subject/search", {
      params: formValue
    })
  }

  const callApiSchool = async () => {
    return await axiosBase.get("api/subject/course")
  }

  const callApiSchoolYear = async (param) => {
    return await axiosBase.get("api/subject/course", {
      params: {
        school: param
      }
    })
  }

  useEffect(() => {
    const fetchApi = async () => {
      const result = (await callApiSchool()).data.result
      setSchool(result)
    }
    fetchApi()
  }, [])

  const loadSchoolYear = async (e) => {
    const result = (await callApiSchoolYear(e.target.value)).data.result
    setSchoolYear(result)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value.trim() })
  }

  const validate = () => {
    if (!formValue.school) {
      toast.info("Need to choose a school")
      return false
    }

    if (!formValue.schoolYear) {
      toast.info("Need to choose a school year")
      return false
    }

    if (!formValue.searchValue) {
      toast.info("Need to insert value search")
      return false
    }
    return true
  }

  const handleKeyUp = async (e) => {
    if(e.keyCode == 13){
      if(validate()){
        const response = await toast.promise(callApiSearch, {
          pending: "Waiting ⏳",
          success: "Let's do it 🚀",
          error: {
            render(){
              return <p>Sorry not found <i><b>{formValue.searchValue}</b></i> 🚫</p>
            }
          }
        })
        myStore.dispatch({ type: SetResultSearch, payload: response.data.result })
      }
    }
  }

  const handleClick = async () => {
    if(validate()){
      const response = await toast.promise(callApiSearch, {
        pending: "Waiting ⏳",
        success: "Let's do it 🚀",
        error: {
          render(){
            return <p>Sorry not found <i><b>{formValue.searchValue}</b></i> 🚫</p>
          }
        }
      })
      myStore.dispatch({ type: SetResultSearch, payload: response.data.result })
    }
  }

  return (
    <div className="search_bar">
      <div className="search_option">
        <select name="school" id="" onChange={(e) => { handleChange(e); loadSchoolYear(e) }} >
          <option value="">Trường</option>
          {school.map((item, index) => {
            item = item.toUpperCase()
            return (
              <option key={index} value={item}>{item}</option>
            )
          })}
        </select>
        <select name="schoolYear" id="" onChange={(e) => { handleChange(e) }} >
          <option value="">Học kỳ</option>
          {schoolYear.map((item, index) => {
            return (
              <option key={index} value={item}>{item}</option>
            )
          })}
        </select>
      </div>
      <div className="search_box">
        <input type="text" placeholder="VD: 802142 OR Môn A" className="input_search" onChange={(e) => { handleChange(e) }} onKeyUp={(e) => handleKeyUp(e)} name="searchValue" />
        <button className="btn_search" onClick={handleClick}>Search</button>
      </div>
    </div>
  )
}

export default SearchBar