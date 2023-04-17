import Footer from '../components/Footer'
import Navigate from '../components/Navigate'
import { NavigateConsumer } from '../context/NavigateProvider'
import Home from '../pages/userScreen/Home'
import Schedule from '../pages/userScreen/Schedule'
import SubjectRegister from '../pages/userScreen/SubjectRegister'

function RootPage(){
  const navigateStore = NavigateConsumer()
  const outLet = () => {
    switch(navigateStore.state.navigate){
      case 1:
        return <Home />
      case 2:
        return <SubjectRegister />
      // case 3:
      //   return <Schedule />
      default:
        return <Home />
    }
  }
  return (
    <>
      <Navigate />
      <div id='mainContainer'>
        {outLet()}
      </div>
      <Footer />
    </>
  )
}

export default RootPage