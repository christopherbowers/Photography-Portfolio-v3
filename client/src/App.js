import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import slugify from 'react-slugify'
import './App.css'
import Header from './components/Header'
// import Nav from './components/Nav'
import Home from './components/Home'
import ProjectPage from './components/ProjectPage'
import DashBoard from './components/DashBoard'
import Footer from './components/Footer'
import Login from './components/Login'

function App() {
  const navigate = useNavigate()
  
  const [isLoggedIn, toggleLogin] = useState(true) // Set to false to disable by default
  const handleLoginClick = () => toggleLogin(true)
  const handleLogoutClick = () => toggleLogin(false)

  
  const [projects, setProjects] = useState([])
  const [images, setImages] = useState([])

  const getProjects = async () => {
    const res = await axios.get('/api/projects')
    setProjects(res.data.projects)
    document.title = 'Christopher Bowers'
  }
  
  const getImages = async () => {
    const res = await axios.get('/api/images')
    setImages(res.data.images)
  }
  
  useEffect(() => {
    getProjects()
    getImages()
  }, [])

  
  const [inputValue, setInputValue] = useState({})


  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }
  
  
  const handleSubmitProject = async (e) => {
    e.preventDefault()
    await axios
      .post(`/api/projects`, {
        title: inputValue.title,
        slug: slugify(inputValue.title)
      })
      .then(() => {
        getProjects()
        navigate("/")
      })
  }

  
  const handleSubmitImage = async (e) => {
    e.preventDefault()
    await axios
      .put(`/api/projects/${inputValue.title}`, {
        image_title: inputValue.image_title,
        year: inputValue.year        
      })
      .then(() => {
        getProjects()
      })
  }

  return (
    <div className="App">
      <Header isLoggedIn={ isLoggedIn } />
 
        <Routes>
        
          <Route path="/" element={ <Home projects={ projects } images={ images } /> } />

          <Route path="/projects/:slug" element={ <ProjectPage getProjects={ getProjects } getImages={ getImages } /> } />
          
          <Route path="/dashboard" 
            element={ <DashBoard 
            projects={ projects }
            inputValue={ inputValue }
            handleChange={ handleChange }
            handleSubmitProject={ handleSubmitProject }
            handleSubmitImage={ handleSubmitImage }
            /> }
          />
          
          <Route path="/login"
              element={ <Login
              isLoggedIn={ isLoggedIn }
              handleLogoutClick={ handleLogoutClick }
              handleLoginClick={ handleLoginClick } 
            /> }
          />

        </Routes>

      <Footer />

    </div>
  );
}

export default App;