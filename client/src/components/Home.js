// import { Helmet } from 'helmet'
import { useEffect } from 'react'
import Nav from './Nav'
import ProjectPage from './ProjectPage'

export default function Home(props) {

   useEffect(() => {
     document.title = 'Portfolio | Home'
   }, [])

  return (
    <div>
      <Nav { ...props } />
      <ProjectPage />
    </div>
  )
}