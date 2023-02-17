import './assets/css/style.css'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import Footer from './views/Footer'
import Menu from './views/Menu'

function RootPage(){
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootPage