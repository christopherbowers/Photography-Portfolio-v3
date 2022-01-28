import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home(props) {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const getImages = async () => {
    axios.get('/api/images')
    .then(res => {
      setImages(res.data.images)
      setLoading(false)
    })
    .catch( error => {
      console.error(error.message)
    })
  }


   useEffect(() => {
     getImages()
     document.title = 'Portfolio | Home'
   }, [])

  const randomImageIndex = Math.floor(Math.random() * images.length)

  if (loading) {
    return <div>loading...</div>
  }
  return (


      <div className="splash-image">


          <img src={ images[randomImageIndex].image_url } alt="" />

      </div>


  )
}
