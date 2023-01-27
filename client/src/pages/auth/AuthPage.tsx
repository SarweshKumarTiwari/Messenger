import { Outlet } from 'react-router-dom'
import Footer from '../../Components/footer/Footer'
import NavBar from '../../Components/nav/screen/NavBar'

export default function AuthPage() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
