import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import DashboardNav from './DashboardNav'
import Footer from './Footer'

export default function LayoutsWithDashboardNav() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  return (
    <>
      <button onClick={logout}>Logout</button>
      <DashboardNav />
      <Outlet />
    </>
  );
}
