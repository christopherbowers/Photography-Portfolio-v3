// import { Helmet } from 'helmet'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Nav from './Nav'
// import ProjectHome from './ProjectHome'
// import ProjectPage from './ProjectPage'

export default function Home(props) {

//     console.log(props.images[2].image_url)
    
//     let imageUrl = props.images[2].image_url
    
   useEffect(() => {
     document.title = 'Portfolio | Home'
   }, [])

  return (
      
    <div className="project-flex-container">
    <div className="side-nav">
      <h2>Projects:</h2>
      <ul>
        {
          props.projects.map((project) => (
            <li key={ project._id } className="project-title">
              <Link  to={( `/projects/${ project._id }` )} >{ project.title }</Link>
            </li>
          ))
        }
      </ul>
    </div>
    <div className="splash-image">

      <img src="/images/pam.jpg" alt="Pam" />

    </div>
    </div>
  )
}
//           <img  src={imageUrl} alt="" />