import { Outlet } from 'react-router-dom'
import DashboardNav from './DashboardNav'

export default function LayoutsWithDashboardNav() {

  return (
    <>
      <DashboardNav />
      <Outlet />
    </>
  );
}
