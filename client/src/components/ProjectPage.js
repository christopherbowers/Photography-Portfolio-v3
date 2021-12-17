import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProjectPage = () => {
  const { slug } = useParams()
  
  const [isLoading, setLoading] = useState(true);
  const [project, setProject] = useState({})
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/projects/' + slug ).then(res => {
      setProject(res.data.project)
      document.title = res.data.project.title
      setLoading(false)
    })
  }, [slug])
  
if (isLoading) {
  return <div class="lds-dual-ring"></div>
}

return (
  
    <div>
    <h2>{project.title}</h2>
      <div>
      { 
        project.image.map((image, index) => (
        <div key={index}>
          <img src={image.image_url} alt='' />
          <p><strong>Title:</strong> {image.title}</p>
        </div>
        ))
      }
      </div>
    </div>   

  
  )
}

export default ProjectPage