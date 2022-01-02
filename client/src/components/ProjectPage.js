import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import axios from 'axios'
import AddImages from './AddImages'

const ProjectPage = (props) => {
  const { slug } = useParams()
  
  const [isLoading, setLoading] = useState(true);
  const [project, setProject] = useState({})
  
  const getProject = () => {
    axios.get(`/api/projects/${slug}`)
    .then(res => {
      setProject(res.data.project)
      document.title = res.data.project.title
      setLoading(false)
    })
  }
    
  useEffect(() => {
    getProject()
  }, )


if (isLoading) {
  return <div className="spinner"></div>
}

return (
  
    <div className="project-container">
    <AddImages props {...props} getProject={ getProject } />
    <h2>{project.title}</h2>
      
      { 
        project.image.map((image, index) => (
        <LazyLoad key={index} height={500} >
        <div className="image-container" >
          <img src={image.image_url} alt={image.image_title} className="image" />
          <p><strong>Title: </strong>{image.image_title} ({image.year})</p>
        </div>
        </LazyLoad>
        ))
      }
      
    </div>   
  
  
  )
}

export default ProjectPage