import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

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
      <div className="side-nav">
        <h3>Projects:</h3>
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
