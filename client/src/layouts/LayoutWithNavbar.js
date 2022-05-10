import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import styles from './LayoutWithNavbar.module.scss'

export default function LayoutWithNavbar() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Nav />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
