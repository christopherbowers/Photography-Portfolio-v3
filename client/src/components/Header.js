import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

let name = 'Christopher Bowers'

export default function Header() {

const userInfo = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: ''

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">{ name }</Link>: Lens Based Media
      </h1>
      {userInfo ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login" style={{color: 'black'}}>Login</Link>}
    </header>
  )
}
