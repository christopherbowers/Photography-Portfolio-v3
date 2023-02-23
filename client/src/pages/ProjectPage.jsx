import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import styles from './ProjectPage.module.scss'
import AddImages from '../components/AddImages'

const ProjectPage = () => {
  const { slug } = useParams()

  const [project, setProject] = useState({})
  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : ''

  const getProject = async (url) => {
    setProject({})
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setProject(data.project)
        document.title = `Christopher Bowers | ${data.project.title}`
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    let ignore = false
    if (!ignore) {
      getProject(`/api/projects?name=${slug}&populate`)
    }

    return () => {
      ignore = true
    }
  }, [slug])

if (!project.image) {
  return <Loading />
}

return (
    <div className={styles.projectContainer}>
    {userInfo ? <AddImages /> : null}
      <h2 className={styles.projectTitle}>{project?.title}</h2>
        {project?.image?.map(({_id, image_url, image_title, year }, i) => (
          <div key={_id} className={styles.imageContainer}>
            <img
              src={image_url}
              alt={image_title}
              className={styles.image}
              loading={i == 0 ? 'eager' : 'lazy'}
            />
            <p><strong>Title: </strong>{image_title} ({year})</p>
          </div>
        ))}
    </div>
  )


}

export default ProjectPage
