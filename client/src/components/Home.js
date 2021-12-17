// import { Helmet } from 'helmet'
import { useEffect } from 'react'

export default function Home() {
   useEffect(() => {
     document.title = 'Portfolio | Home'
   }, [])

  return (
    <div>
      {/*<img src="/img/curvedwallride.jpg" alt="Wall Ride" />*/}
    </div>
  )
}