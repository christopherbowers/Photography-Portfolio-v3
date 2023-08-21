import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss'

export default function Nav() {

  const [projects, setProjects] = useState([])
  let didInit = false;

  const getProjects = async () => {
    await fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getProjects()
    }
  }, [didInit])

  return (
      <nav className={styles.nav}>
        <ul>
          {projects?.map(({_id, slug, title}) => (
            <li key={ _id } className={styles.projectTitle}>
              <NavLink  to={( `/project/${ slug }` )} >
                { title }
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
  )
}
