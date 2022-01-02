import { NavLink } from 'react-router-dom'

export default function Nav(props) {
  return (
    
      <div className="side-nav">
        <h3>Projects:</h3>
        <ul>
          {
            props.projects.map((project) => (
              <li key={ project._id } className="project-title">
                <NavLink  to={( `/projects/${ project._id }` )} >{ project.title }</NavLink>
              </li>
            ))
          }
        </ul>
      </div>

  )
}