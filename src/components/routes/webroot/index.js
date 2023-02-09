import './assets/css/style.css'
import 'react-toastify/dist/ReactToastify.css'
import SearchBar from "./views/SearchBar"
import Table from "./views/table/Table"
import Schedule from "./views/schedule/Schedule"
import TableResult from './views/TableResult'
import Footer from './views/Footer'

function RootPage(){
  return (
    <>
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

export default RootPage