import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Loading from '../components/Loading';

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    await fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
        setLoading(false);
      })
      .catch((error) => error.message);
  };

  useEffect(() => {
    document.title = 'Portfolio | Home';
    getImages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!images?.length && !loading) {
    return null;
  }

  const randomImageIndex = Math.floor(Math.random() * images.length);
  const image = images[randomImageIndex];

  return (
    <div className={styles.splashImage}>
      <img src={image.image_url} alt={`Image Title: ${images.image_title}`} />
    </div>
  );
}
