import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashBoardLink from './DashBoardLink'
import ProjectNav from './ProjectNav'


let name = 'Christopher Bowers'

export default function Header(props) {

  return (
    <header>
      <h1>
        <Link to="/">{ name }</Link>: Lens Based Media
      </h1>
      {/*<ProjectNav projects={ props.projects } />*/}
      <DashBoardLink isLoggedIn={ props.isLoggedIn } />
    </header>
  )
}