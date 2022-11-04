import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './css/style.css'
import SearchBar from "./SearchBar"
import Table from "./Table"
import Schedule from "./Schedule"

function Core(){
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="core">
        <SearchBar />
        <Table />
        <Schedule />
      </div>
    </>
  )
}

export default Core