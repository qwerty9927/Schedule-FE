import SearchBar from "./components/SearchBar"
import PanelSubject from "./components/PanelSubject"
import PanelSelected from "./components/PanelSelected"
import PanelLiveReview from './components/PanelLiveReview'
import IconCatalog from "../../components/IconCatalog"

function SubjectRegister(){
  return (
    <div className="core">
      <SearchBar />
      <PanelSubject />
      <PanelSelected />
      <PanelLiveReview />
      <IconCatalog />
    </div>
  )
}

export default SubjectRegister