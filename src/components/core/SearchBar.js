import { useContext, useEffect, useState } from "react"
import axiosBase from "../../api/axiosBase"
import Context from "../store/Context"
import { ResetResultSearch, ResetResultSearchHandled, SetResultSearch, SetResultSearchHandled, SetSemester } from '../store/Constant'
import { toast } from "react-toastify"
import clsx from "clsx"

function SearchBar() {
  const [formValue, setFormValue] = useState({})
  const [formValueFilter, setFormValueFilter] = useState({})
  const [school, setSchool] = useState([])
  const [schoolYear, setSchoolYear] = useState([])
  const [filterBtn, setFilterBtn] = useState(false)
  const myStore = useContext(Context)

  const callApiSearch = async () => {
    return await axiosBase.post("api/subject/search", {
      ...formValue
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

  const validate = () => {
    if (!formValue.school) {
      toast.warn("Need to choose a school")
      return false
    }

    if (!formValue.schoolYear) {
      toast.warn("Need to choose a school year")
      return false
    }

    if (!formValue.searchValue) {
      toast.warn("Need to insert value search")
      return false
    }
    return true
  }

  const validateFilter = () => {
    if (!formValueFilter.day) {
      toast.warn("Need to choose a day")
      return false
    }

    if (!formValueFilter.startLession) {
      toast.warn("Need to choose a lession")
      return false
    }

    return true
  }

  const actionCallApiSearch = async () => {
    if (validate()) {
      const response = await toast.promise(callApiSearch, {
        pending: "Waiting ⏳",
        success: "Let's do it 🚀",
        error: {
          render() {
            return <p>Sorry not found <i><b>"{formValue.searchValue}"</b></i> 🚫</p>
          }
        }
      })
      myStore.dispatch({ type: SetResultSearch, payload: response.data.result })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value.trim() })
  }

  const handleKeyUp = async (e) => {
    if (e.keyCode == 13) {
      actionCallApiSearch()
    }
  }

  const handleClickBtnSearch = async () => {
    actionCallApiSearch()
  }

  const handleClickShowFilter = () => {
    if(myStore.state.resultSearch.length){
      setFilterBtn(!filterBtn)
    } else {
      toast.info("Cần tìm kiếm thông tin trước khi lọc")
    }
  }

  const handleClickBtnFilter = () => {
    if(validateFilter()){
      const result = myStore.state.resultSearch.filter((item, index) => {
        for(let i = 0; i < item.Thu.length; i++){
          if(item.Thu[i] == formValueFilter.day && item.TBD[i] == formValueFilter.startLession){
            return true
          }
        }
      })
      myStore.dispatch({ type: SetResultSearchHandled, payload: result })
    }
  }

  const handleChangeOfFilter = (e) => {
    const { name, value } = e.target
    setFormValueFilter({ ...formValueFilter, [name]: value })
  }

  const handleClickBtnCloseFilter = () => {
    if(formValueFilter.day || formValueFilter.startLession){
      setFormValueFilter({day: "", startLession: ""})
      myStore.dispatch({ type: ResetResultSearchHandled})
    }
  }

  return (
    <div className="search_bar">
      <div className="search_bar_block_top">
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
          <select name="schoolYear" id="" onChange={(e) => { handleChange(e); 
            if(e.target.value){
              myStore.dispatch({ type: SetSemester, payload: e.target.value }) 
            }
            }} >
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
          <button className="btn_search" onClick={handleClickBtnSearch}>Search</button>
        </div>
        <div className="filter_box">
            <button onClick={(e) => handleClickShowFilter(e)}><i className="fa-solid fa-filter"></i></button>
        </div>
      </div>
      <div className={clsx("search_bar_block_bot", {"search_bar_block_bot_show": filterBtn}, {"search_bar_block_bot_hide": !filterBtn})}>
        <div className="filter_option">
          <label htmlFor="">Thứ: </label>
          <select name="day" id="" value={formValueFilter.day} onChange={(e) => {handleChangeOfFilter(e)}}>
            <option value="">--Option--</option>
            {(new Array(7).fill(0)).map((item, index) => {
              if(index > 0){
                return (
                  <option value={index + 1} key={index}>
                    {index + 1}
                  </option>
                )
              }
            })}
          </select>
          <label htmlFor="">Tiết bắt đầu: </label>
          <select name="startLession" id="" value={formValueFilter.startLession} onChange={(e) => {handleChangeOfFilter(e)}}>
            <option value="">--Option--</option>
            {(new Array(10).fill(0)).map((item, index) => {
              return (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              )
            })}
          </select>
          <button className="btn_filter" onClick={handleClickBtnFilter}>Filter</button>
          <button className="btn_close_filter" onClick={handleClickBtnCloseFilter}><i className="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar