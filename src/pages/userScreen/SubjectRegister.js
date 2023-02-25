import SearchBar from "./components/SearchBar"
import PanelSubject from "./components/PanelSubject"
import PanelSelected from "./components/PanelSelected"
import PanelLiveReview from './components/PanelLiveReview'

function SubjectRegister(){
  return (
    <div className="core">
      <SearchBar />
      <PanelSubject />
      <PanelSelected />
      <PanelLiveReview />
    </div>
  )
}

export default SubjectRegister