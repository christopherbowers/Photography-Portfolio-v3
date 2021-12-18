import { NavLink } from 'react-router-dom'

export default function Nav(props) {

  return (
  
    <ul>
      {
        props.projects.map((project) => (
          <li key={ project._id }><NavLink to={( `/projects/${ project.slug }` )} >{ project.title }</NavLink></li>
        ))
      }
    </ul>
  )
}