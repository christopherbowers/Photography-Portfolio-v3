import { NavLink } from 'react-router-dom'

export default function ProjectNav(props) {

const title = props.title.replace(' ', '-').toLowerCase()
  return (
    <li><NavLink to={( `/projects/${ title }` )} >{ props.title }</NavLink></li>
  )
}