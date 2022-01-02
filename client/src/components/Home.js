import { useEffect } from 'react'

export default function Home(props) {

   useEffect(() => {
     document.title = 'Portfolio | Home'
   }, [])
  
  const randomImageIndex = Math.floor(Math.random() * props.images.length)

  return (
      
    <div className="project-flex-container">
      <div className="splash-image">
        { 
          props.images.length && 
          <img src={ props.images[randomImageIndex].image_url } alt="" /> 
        }
      </div>
    </div>
    
  )
}