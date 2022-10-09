import './css/style.css'
import SearchBar from "./SearchBar"
import Table from "./Table"
import Schedule from "./Schedule"

function Core(){
  return (
    <div className="core">
      <SearchBar />
      <Table />
      <Schedule />
    </div>
  )
}

export default Core