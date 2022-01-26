import { Link } from 'react-router-dom'

let name = 'Christopher Bowers'

export default function Header(props) {

  return (
    <header>
      <h1>
        <Link to="/">{ name }</Link>: Lens Based Media
      </h1>
      <Link to="/dashboard">Dashboard</Link>
    </header>
  )
}
