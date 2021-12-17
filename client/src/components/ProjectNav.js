import { NavLink } from 'react-router-dom'

export default function ProjectNav(props) {

const titleSlug = props.title.replace(' ', '-').toLowerCase()
  return (
    <li><NavLink to={( `/projects/${ titleSlug }` )} >{ props.title }</NavLink></li>
  )
}