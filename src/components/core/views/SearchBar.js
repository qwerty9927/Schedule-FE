import { useContext, useEffect, useState } from "react"
import axiosBase from "../../../api/axiosBase"
import Context from "../../store/Context"
import { ResetResultSearch, ResetResultSearchHandled, SetMajors, SetResultSearch, SetResultSearchHandled, SetSemester } from '../../store/Constant'
import { toast } from "react-toastify"
import clsx from "clsx"

function SearchBar() {
  const myStore = useContext(Context)
  const [formValue, setFormValue] = useState({schoolYear: myStore.state.semester || "", majors: myStore.state.majors || ""})
  const [formValueFilter, setFormValueFilter] = useState({})
  const [schoolYear, setSchoolYear] = useState([])
  const [majors, setMajors] = useState([])
  const [filterBtn, setFilterBtn] = useState(false)

  const callApiSearch = async () => {
    return await axiosBase.post("api/subject/search", {
      ...formValue
    })
  }

  const callApiSchoolYear = async () => {
    return await axiosBase.get("api/subject/course")
  }

  const callApiMajors = async () => {
    return await axiosBase.get("api/subject/majors")
  }

  useEffect(() => {
    const fetchApi = async () => {
      const resultRoot = (await callApiSchoolYear()).data.result
      const resultMajors = (await callApiMajors()).data.result 
      setSchoolYear(resultRoot)
      setMajors(resultMajors)
    }
    fetchApi()
  }, [])

  const validate = () => {
    if (!formValue.schoolYear) {
      toast.warn("Cần chọn học kỳ")
      return false
    }

    if (!formValue.majors) {
      toast.warn("Cần chọn khoa")
      return false
    }

    if (!formValue.searchValue) {
      toast.warn("Cần nhập thông tin tìm kiếm")
      return false
    }
    return true
  }

  const validateFilter = () => {
    if (!formValueFilter.day) {
      toast.warn("Cần chọn ngày")
      return false
    }

    if (!formValueFilter.startLession) {
      toast.warn("Cần chọn tiết bắt đầu")
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
            return <p>Không tìm thấy <i><b>"{formValue.searchValue}"</b></i> 🚫</p>
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
    if (e.keyCode === 13) {
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
      toast.info("Cần tìm kiếm môn học trước khi Filter")
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
      if(result.length){
        toast.success("Đã tìm thấy kết quả")
      } else {
        toast.error("Không tìm thấy kết quả")
      }
    }
  }

  const handleChangeOfFilter = (e) => {
    const { name, value } = e.target
    setFormValueFilter({ ...formValueFilter, [name]: value })
  }

  const handleClickBtnCloseFilter = () => {
    if(formValueFilter.day || formValueFilter.startLession){
      toast.info("Xóa kết quả Filter")
      setFormValueFilter({day: "", startLession: ""})
      myStore.dispatch({ type: ResetResultSearchHandled})
    }
  }

  return (
    <div className="search_bar">
      <div className="search_bar_block_top">
        <div className="search_option">
          <select name="schoolYear" value={formValue.schoolYear} onChange={(e) => { handleChange(e); 
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
          <select name="majors" id="" value={formValue.majors} onChange={(e) => { handleChange(e); 
            if(e.target.value){
              myStore.dispatch({ type: SetMajors, payload: e.target.value }) 
            }
            }} >
            <option value="">Khoa</option>
            {majors.map((item, index) => {
              return (
                <option key={index} value={item}>{item.toUpperCase()}</option>
              )
            })}
          </select>
        </div>
        <div className="search_box">
          <input type="text" placeholder="VD: 802142 OR Môn A" className="input_search" onChange={(e) => { handleChange(e) }} onKeyUp={(e) => handleKeyUp(e)} name="searchValue" />
          <button className="btn_search" onClick={handleClickBtnSearch}>Search</button>
        </div>
        <div className="filter_box">
            <button title="Filter" onClick={(e) => handleClickShowFilter(e)}><i className="fa-solid fa-filter"></i></button>
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
          <button title="Clear option" className="btn_close_filter" onClick={handleClickBtnCloseFilter}><i className="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar