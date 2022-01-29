import { Link } from 'react-router-dom'

export default function DashboardNav() {
  return (
      <div>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/addproject">Add Project</Link></li>
        </ul>
      </div>
  )
}
