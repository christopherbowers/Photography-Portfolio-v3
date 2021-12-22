import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import slugify from 'react-slugify'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import ProjectPage from './components/ProjectPage'
import DashBoard from './components/DashBoard'
import Footer from './components/Footer'
import Login from './components/Login'

function App() {
  
  const [isLoggedIn, toggleLogin] = useState(true) // Set to false to disable by default
  const handleLoginClick = () => toggleLogin(true)
  const handleLogoutClick = () => toggleLogin(false)

  
  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const res = await axios.get('http://localhost:3001/api/projects')
    setProjects(res.data.projects)
  }
  
  useEffect(() => {
    getProjects()
  }, [])

  
  const [inputValue, setInputValue] = useState({})


  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const handleSubmitProject = async (e) => {
    e.preventDefault()
    await axios
      .post(`http://localhost:3001/api/projects`, {
        title: inputValue.title,
        slug: slugify(inputValue.title)
      })
      .then(() => {
        getProjects()
      })
  }

  const handleSubmitDeleteProject = async (e) => {
    e.preventDefault()
    await axios
      .delete(`/api/projects/${inputValue.title}`, {
      })
      .then(() => {
        getProjects()
      })
  }

  return (
    <div className="App">
      <Header 
        isLoggedIn={ isLoggedIn }
        projects={ projects } 
      />
 
        <Routes>
        
          <Route path="/" element={ <Home projects={ projects } /> } />

          <Route path="/projects/:slug" element={ <ProjectPage projects={ projects } /> } />
          
          <Route path="/dashboard" 
            element={ <DashBoard 
            projects={ projects }
            inputValue={ inputValue }
            handleChange={ handleChange }
            handleSubmitProject={ handleSubmitProject }
            handleSubmitDeleteProject={ handleSubmitDeleteProject }
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