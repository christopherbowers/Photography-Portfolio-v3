import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProjectPage = () => {
  const { slug } = useParams()
  
  const [isLoading, setLoading] = useState(true);
  const [project, setProject] = useState({})
  
  useEffect(() => {
    axios.get('/api/projects/' + slug ).then(res => {
      setProject(res.data.project)
      document.title = res.data.project.title
      setLoading(false)
    })
  }, [slug])
  
if (isLoading) {
  return <div className="spinner"></div>
}

return (
  
    <div className="project-container">
    <h2>{project.title}</h2>
      
      { 
        project.image.map((image, index) => (
        <div className="image-container" key={index}>
          <img src={image.image_url} alt={image.image_title} className="image" />
          <p><strong>Title: </strong>{image.image_title} ({image.year})</p>
        </div>
        ))
      }
      
    </div>   

  
  )
}

export default ProjectPage