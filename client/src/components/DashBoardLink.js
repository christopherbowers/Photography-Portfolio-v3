import { NavLink } from 'react-router-dom'

export default function DashBoardLink(props) {
  
  const isLoggedIn = props.isLoggedIn
  
  if (isLoggedIn) {
    
  return (
      <div>
        <NavLink to="/dashboard">Add Project</NavLink>
      </div>
    )
  }
  
  return (
    <div></div>
  )
}