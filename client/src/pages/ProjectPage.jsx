import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import styles from './ProjectPage.module.scss'
import AddImages from '../components/AddImages'

const ProjectPage = () => {
  const { slug } = useParams()

  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState({})
  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : ''

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
  }, [slug])

if (loading) {
  return <Loading />
}

return (
    <div className={styles.projectContainer}>
    {userInfo ? <AddImages /> : null}
      <h2 className={styles.projectTitle}>{project.title}</h2>
        {project?.image.map((image, index) => (
          <div key={image._id} className={styles.imageContainer} style={{minHeight: '400px'}}>
            <img
              src={image.image_url}
              alt={image.image_title}
              className={styles.image}
              loading={index == 0 ? 'eager' : 'lazy'}
            />
            <p><strong>Title: </strong>{image.image_title} ({image.year})</p>
          </div>
        ))}
    </div>
  )
}

export default ProjectPage
