import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Home.module.scss'
import Loading from '../components/Loading'

export default function Home() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const getImages = async () => {
    await axios.get('/api/images')
    .then(res => {
      setImages(res.data.images)
      setLoading(false)
    })
    .catch( error => error.message )
  }

   useEffect(() => {
     document.title = 'Portfolio | Home'
     getImages()
   }, [])

  const randomImageIndex = Math.floor(Math.random() * images.length)

  return (
    <div className={styles.splashImage}>
      {(
        loading
        ) ? (
        <Loading />
        ) : (
        <img
          src={ images[randomImageIndex].image_url }
          alt={ `Image Title: ${images[randomImageIndex].image_title}` }
        />
      )}
    </div>
  )
}
