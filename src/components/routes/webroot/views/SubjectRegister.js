import SearchBar from "./SearchBar"
import Table from "./table/Table"
import Schedule from "./schedule/Schedule"
import TableResult from './TableResult'

function SubjectRegister(){
  return (
    <div className="core">
      <SearchBar />
      <Table />
      <TableResult />
      <Schedule />
    </div>
  )
}

export default SubjectRegister