import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home(props) {

   useEffect(() => {
     document.title = 'Portfolio | Home'
   }, [])
  
  const randomImageIndex = Math.floor(Math.random() * props.images.length)

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
        { 
          props.images.length && 
          <img src={ props.images[randomImageIndex].image_url } alt="" /> 
        }
      </div>
    </div>
    
  )
}