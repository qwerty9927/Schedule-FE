import { useContext, useEffect, useState } from "react"
import { Button, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import clsx from "clsx"
import { toast } from "react-toastify"
import style from "../../../assets/css/userScreen/searchBar.module.css"
import axios from "../../../libs/axios"
import Context from "../../../context/Context"
import { ResetResultSearchHandled, SetMajors, SetResultSearch, SetResultSearchHandled, SetSemester } from '../../../data/constantProvider'
import message from "../../../data/toastMessage"

function SearchBar() {
  const stringWaiting = "Waiting..."
  const stringSemester = "Học kỳ"
  const stringMajors = "Mã ngành"
  const myStore = useContext(Context)
  const [formValue, setFormValue] = useState({ schoolYear: myStore.state.semester || "", majors: myStore.state.majors || "" })
  // const [formValueFilter, setFormValueFilter] = useState({})
  const [schoolYear, setSchoolYear] = useState([])
  const [majors, setMajors] = useState([])
  // const [filterBtn, setFilterBtn] = useState(false)
  const [loadingSemester, setLoadingSemester] = useState(myStore.state.semester ? stringWaiting : stringSemester)
  const [loadingMajors, setLoadingMajors] = useState(myStore.state.majors ? stringWaiting : stringMajors)

  const callApiSearch = async () => {
    return await axios.post("api/subject/search", {
      keySearch: formValue.searchValue,
      semester: formValue.schoolYear,
      majors: formValue.majors,
    })
  }

  const callApiCourse = async () => {
    return await axios.get("api/subject/course")
  }

  const callApiMajors = async (value) => {
    return await axios.get(`api/subject/majors?semester=${value}`)
  }

  useEffect(() => {
    const fetchApi = async () => {
      const resultRoot = (await callApiCourse()).data.metadata
      setLoadingSemester(stringSemester)
      setSchoolYear(resultRoot)
    }
    fetchApi()
  }, [])

  useEffect(() => {
    const fetchApi = async () => {
      if (formValue.schoolYear) {
        const resultMajors = (await callApiMajors(formValue.schoolYear)).data.metadata
        setLoadingMajors(stringMajors)
        setMajors(resultMajors)
        setFormValue({ ...formValue, majors: myStore.state.majors || "" })
      }
    }
    fetchApi()
  }, [formValue.schoolYear])

  const validate = () => {
    if (!formValue.schoolYear) {
      toast.warn(message.searchSchoolYearWarn)
      return false
    }

    if (!formValue.majors) {
      toast.warn(message.searchMajorsWarn)
      return false
    }

    if (!formValue.searchValue) {
      toast.warn(message.searchSearchValueWarn)
      return false
    }

    if(guessMasv(formValue.searchValue)){
      toast.error(() => (
        <>
          <p>Không tìm thấy <i><b>"{formValue.searchValue}"</b></i> 🚫</p>
          <div className={clsx(style.alertMessageAttention, style.textShape)}>
            {message.searchErrorFormat()}
          </div>
        </>
        )
      )
      return false
    }
    return true
  }

  // const validateFilter = () => {
  //   if (!formValueFilter.day) {
  //     toast.warn(message.filterDayWarn)
  //     return false
  //   }

  //   if (!formValueFilter.startLession) {
  //     toast.warn(message.filterStartLessionWarn)
  //     return false
  //   }

  //   return true
  // }

  const guessMasv = (string) => {
    return /^31[0-9]{8}$/.test(string)
  }

  const actionCallApiSearch = async () => {
    if (validate()) {
      const response = await toast.promise(callApiSearch, {
        pending: message.searchPending,
        success: message.searchSuccess,
        error: {
          render() {
            return (
              <div>
                <div>
                  <p>Không tìm thấy <i><b>"{formValue.searchValue}"</b></i> 🚫</p>
                  <div className={clsx(style.alertMessageNotFound, style.textShape)}>
                    {message.searchErrorData()}
                  </div>
                </div>
              </div>
            )
          }
        }
      })
      myStore.dispatch({ type: SetResultSearch, payload: response.data.metadata })
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

  // const handleClickShowFilter = () => {
  //   if (myStore.state.resultSearch.length) {
  //     setFilterBtn(!filterBtn)
  //   } else {
  //     toast.info(message.filterFeatureInfo)
  //   }
  // }

  // const handleClickBtnFilter = () => {
  //   if (validateFilter()) {
  //     const result = myStore.state.resultSearch.filter((item, index) => {
  //       for (let i = 0; i < item.Thu.length; i++) {
  //         if (item.Thu[i] == formValueFilter.day && item.TBD[i] == formValueFilter.startLession) {
  //           return true
  //         }
  //       }
  //     })
  //     myStore.dispatch({ type: SetResultSearchHandled, payload: result })
  //     if (result.length) {
  //       toast.success(message.resultFilterSuccess)
  //     } else {
  //       toast.error(message.resultFilterError)
  //     }
  //   }
  // }

  // const handleChangeOfFilter = (e) => {
  //   const { name, value } = e.target
  //   setFormValueFilter({ ...formValueFilter, [name]: value })
  // }

  // const handleClickBtnCloseFilter = () => {
  //   if (formValueFilter.day || formValueFilter.startLession) {
  //     toast.info("Xóa kết quả Filter")
  //     setFormValueFilter({ day: "", startLession: "" })
  //     myStore.dispatch({ type: ResetResultSearchHandled })
  //   }
  // }

  return (
    <div className={style.search_bar}>
      <div className={style.search_bar_block_top}>
        <div className={style.search_option}>
          <select name="schoolYear" value={formValue.schoolYear} onChange={(e) => {
            handleChange(e);
            if (e.target.value) {
              myStore.dispatch({ type: SetSemester, payload: e.target.value })
            }
          }} >
            <option value="">{loadingSemester}</option>
            {schoolYear.map((item, index) => {
              return (
                <option key={index} value={item.Semester}>{item.Semester.toUpperCase()}</option>
              )
            })}
          </select>
          <select name="majors" id="" value={formValue.majors} onChange={(e) => {
            handleChange(e);
            if (e.target.value) {
              myStore.dispatch({ type: SetMajors, payload: e.target.value })
            }
          }} >
            <option value="">{loadingMajors}</option>
            {majors.sort().map((item, index) => {
              return (
                <option key={index} value={item.Majors}>{item.Majors.toUpperCase()}</option>
              )
            })}
          </select>
        </div>
        <div className={style.search_box}>
          <Input maxLength={50} style={{marginRight: 20}} placeholder="861304 or Tư tưởng Hồ Chí Minh" onChange={(e) => { handleChange(e) }} onKeyUp={(e) => handleKeyUp(e)} name="searchValue" />
          <Button icon={<SearchOutlined />} type="primary" onClick={handleClickBtnSearch}>Search</Button>
        </div>
        {/* <div className={style.filter_box}>
          <button title="Filter" onClick={(e) => handleClickShowFilter(e)}><i className="fa-solid fa-filter"></i></button>
        </div> */}
      </div>
      {/* <div className={clsx(style.search_bar_block_bot, { [style.search_bar_block_bot_show]: filterBtn }, { [style.search_bar_block_bot_hide]: !filterBtn })}>
        <div className={style.filter_option}>
          <label htmlFor="">Thứ: </label>
          <select name="day" id="" value={formValueFilter.day} onChange={(e) => { handleChangeOfFilter(e) }}>
            <option value="">--Option--</option>
            {(new Array(7).fill(0)).map((item, index) => {
              if (index > 0) {
                return (
                  <option value={index + 1} key={index}>
                    {index + 1}
                  </option>
                )
              }
            })}
          </select>
          <label htmlFor="">Tiết bắt đầu: </label>
          <select name="startLession" id="" value={formValueFilter.startLession} onChange={(e) => { handleChangeOfFilter(e) }}>
            <option value="">--Option--</option>
            {(new Array(10).fill(0)).map((item, index) => {
              return (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              )
            })}
          </select>
          <button className={style.btn_filter} onClick={handleClickBtnFilter}>Filter</button>
          <button title="Clear option" className={style.btn_close_filter} onClick={handleClickBtnCloseFilter}><i className="fa-solid fa-xmark"></i></button>
        </div>
      </div> */}
    </div>
  )
}

export default SearchBar