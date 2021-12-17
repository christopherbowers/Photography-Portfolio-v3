import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProjectPage = () => {
  const { slug } = useParams()

  const [project, setProject] = useState({})
  
  useEffect(() => {
    getProject()
  }, [])

  const getProject = async () => {
    const res = await axios.get('http://localhost:3001/api/projects/' + slug )
    setProject(res.data.project)
  }

  console.log(project.image)

  return (
  
    <h2>{project.title}</h2>
    
    

  
  )
}

export default ProjectPage
