import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import styles from './Nav.module.scss'

export default function Nav() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      await axios
        .get('/api/projects')
        .then(res => {
          setProjects(res.data.projects)
        })
        .catch(err => console.error(err))
    }
    getProjects()
  }, [])

  return (
      <nav className={styles.nav}>
        <ul>
          {projects.map(({_id, slug, title}) => (
            <li key={ _id } className={styles.projectTitle}>
              <NavLink  to={( `/projects/${ slug }` )} >
                { title }
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
  )
}
