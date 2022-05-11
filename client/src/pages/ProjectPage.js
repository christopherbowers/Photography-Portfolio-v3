import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import axios from 'axios'
import Loading from '../components/Loading'
import styles from './ProjectPage.module.scss'

const ProjectPage = () => {
  const { slug } = useParams()

  const [loading, setLoading] = useState(true)
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
  }, [slug])

if (loading) {
  return <Loading />
}

return (
    <div className={styles.projectContainer}>
      <h2 className={styles.projectTitle}>{project.title}</h2>
        {project ? project.image.map((image, index) => (
          <LazyLoad key={index} height={1000} >
            <div className={styles.imageContainer} >
              <img src={image.image_url} alt={image.image_title} className={styles.image} />
              <p><strong>Title: </strong>{image.image_title} ({image.year})</p>
            </div>
          </LazyLoad>
        )) : null}
    </div>
  )
}

export default ProjectPage
