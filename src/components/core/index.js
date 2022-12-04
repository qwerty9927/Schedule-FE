import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './css/style.css'
import SearchBar from "./SearchBar"
import Table from "./Table"
import Schedule from "./Schedule"
import TableResult from './TableResult'
import Footer from './Footer'

function Core(){
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="core">
        <SearchBar />
        <Table />
        <TableResult />
        <Schedule />
      </div>
      <Footer />
    </>
  )
}

export default Core