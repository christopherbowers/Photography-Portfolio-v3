// import { Helmet } from 'helmet'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Nav from './Nav'
// import ProjectHome from './ProjectHome'
// import ProjectPage from './ProjectPage'

export default function Home(props) {

   useEffect(() => {
     document.title = 'Portfolio | Home'
   }, [])

  return (
      
    <div className="project-flex-container">
    
      {
        props.projects.map((project) => (
          <Link key={ project._id } to={( `/projects/${ project.slug }` )} >
            <div className="grid-item">
              <div className="grid-image-wrapper">
                <img src="" alt="" />
              </div>
              <h3 className="project-title">{ project.title }</h3>
            </div>
          </Link>
        ))
      }
    
    </div> 
  )
}