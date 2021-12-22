import { NavLink } from 'react-router-dom'

export default function Nav(props) {

  return (
  
<div class="menu-area">
  <ul>
    <li><a href="#">Projects</a>
      <ul class="dropdown-1">
               {
                  props.projects.map((project) => (
                    <li key={ project._id }><NavLink  to={( `/projects/${ project.slug }` )} >{ project.title }</NavLink></li>
                  ))
                }
      </ul>
    </li>
  </ul>
</div>

 
  )
}




