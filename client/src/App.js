import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import slugify from 'react-slugify'
import './App.css'
import Header from './components/Header'
// import Nav from './components/Nav'
import Home from './components/Home'
import ProjectPage from './components/ProjectPage'
import DashBoard from './components/DashBoard'
import Footer from './components/Footer'
// import ProjectHome from './components/ProjectHome'

function App() {

  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const res = await axios.get('http://localhost:3001/api/projects')
    setProjects(res.data.projects)
    document.title = 'Christopher Bowers'
  }
  
  useEffect(() => {
    getProjects()
  }, [])

  
  const [inputValue, setInputValue] = useState({
    title: '',
    slug: ''
  })

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  }
  
  
  const handleSubmit = async (e) => {
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
  
  const handleSubmitImage = async (e) => {
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

  return (
    <div className="App">
      <Header />
 
        <Routes>
        
          <Route path="/" element={ <Home projects={ projects } /> } />

          <Route path="/projects/:slug" element={ <ProjectPage /> } />
          
          <Route path="/dashboard" 
            element={ <DashBoard 
            inputValue={ inputValue }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            handleSubmitImage={ handleSubmitImage }
            projects={ projects } /> }
          />

        </Routes>

      <Footer />

    </div>
  );
}

export default App;