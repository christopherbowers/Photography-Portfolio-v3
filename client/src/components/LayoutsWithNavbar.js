import { Outlet } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'

export default function LayoutsWithNavbar(props) {
  return (
    <>
      <Header />
      <Nav {...props} />
      <Outlet />
      <Footer />
    </>
  )
}
