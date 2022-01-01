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
  }, [])
  
  const Spinner = () => (
  <div className="post loading">
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#49d1e0"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(275.845 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
)
  
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