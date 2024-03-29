// CustomAction
const addSuccess = "Thêm học phần thành công 😊"
const removeSuccess = "Xóa học phần thành công 😎"
const messageInfo = "Số tính chỉ đạt tối đa"
const tabsInfo = "Không thể dùng quá 5 tabs"
const schoolYearWarn = "Cần chọn học kỳ"

// SearchBar
const searchSchoolYearWarn = "Cần chọn học kỳ"
const searchMajorsWarn = "Cần chọn ngành"
const searchSearchValueWarn = "Cần nhập thông tin tìm kiếm"
const filterDayWarn = "Cần chọn ngày"
const filterStartLessionWarn = "Cần chọn tiết bắt đầu"
const filterFeatureInfo = "Cần tìm kiếm môn học trước khi Filter"
const filterDeleteInfo = "Xóa kết quả Filter"
const resultFilterSuccess = "Đã tìm thấy kết quả"
const resultFilterError = "Không tìm thấy kết quả"
const searchPending = "Waiting ⏳"
const searchSuccess = "Let's do it 🚀"
const searchErrorData = () => (
  <>
    <p>Kết quả này có thể chưa cập nhật hoặc có thể đã chọn sai <b>mã ngành</b>.</p>
    <p><b>Vui lòng quay lại sau!</b></p>
  </>
)
const searchErrorFormat = () => (
  <>
    <p>Lưu ý <b>mã sinh viên</b> không là từ khóa tìm kiếm</p>
    <p>Cần nhập <b>mã</b> hoặc <b>tên môn học</b></p>
  </>
)

// close tab
const closeTabsSuccess = "Xóa tab thành công"
const closeTabsInfo = "Không thể xóa tab này"

// Import
const importInfo = "Hãy xóa đi 1 tabs không dùng"
const importWarn = (term) => `Hãy chọn học kỳ ${term} để import`
const importError = "Mã thời khóa biểu không tồn tại"
const importSuccess = "Mã hợp lệ"

// Login
const loginError = "Đăng nhập thất bại"
const loginWarn = "Tài khoản hoặc mật khẩu không đúng"
const loginPending = "Wait a minute"
const loginSuccess = "Đăng nhập thành công"

// Modify subject
const modifyValidSuccess = "Thay đổi thành công"
const modifyValidError = "Cần điền đầy đủ thông tin"


const message = {
  addSuccess,
  removeSuccess,
  messageInfo,
  tabsInfo,
  schoolYearWarn,

  // SearchBar
  searchSchoolYearWarn,
  searchMajorsWarn,
  searchSearchValueWarn,
  filterDayWarn,
  filterStartLessionWarn,
  filterFeatureInfo,
  filterDeleteInfo,
  resultFilterSuccess,
  resultFilterError,
  searchPending,
  searchSuccess,
  searchErrorData,
  searchErrorFormat,

  // close tab
  closeTabsSuccess,
  closeTabsInfo,
  
  // Import
  importError,
  importSuccess,
  importInfo,
  importWarn,

  // Login
  loginSuccess,
  loginError,
  loginPending,
  loginWarn,
  
  // Modify subject
  modifyValidSuccess,
  modifyValidError
}
export default message
