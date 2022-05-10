import { Outlet } from 'react-router-dom'
import DashboardNav from '../components/DashboardNav'

export default function LayoutWithDashboardNav() {

  return (
    <>
      <DashboardNav />
      <Outlet />
    </>
  );
}
