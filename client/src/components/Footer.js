import { NavLink } from 'react-router-dom'
export default function Footer() {
  return (
    <footer>
      <ul>
        <li><NavLink to="/dashboard">Dash Board</NavLink></li>
        <li><NavLink to="/">Home</NavLink></li>
      </ul>
    </footer>
  )
}