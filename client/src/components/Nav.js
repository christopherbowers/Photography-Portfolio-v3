import { NavLink } from 'react-router-dom'

export default function Nav(props) {

  return (
  
    <ul>
      {
        props.projects.map((project) => (
          <li><NavLink to={( `/projects/${ project.slug }` )} >{ project.title }</NavLink></li>
        ))
      }
    </ul>
    
  )
}