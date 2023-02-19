import './assets/css/style.css'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import Footer from './views/Footer'
import Navigate from './views/Navigate'

function RootPage(){
  return (
    <>
      <Navigate />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootPage