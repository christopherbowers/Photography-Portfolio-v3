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
      <div className={styles.nav}>
        <ul>
          {projects.map((project) => (
              <li key={ project._id } className="project-title">
                <NavLink  to={( `/projects/${ project._id }` )} >
                  { project.title }
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
  )
}
