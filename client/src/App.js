import { useState, useEffect, Suspense, lazy } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ProjectPage from './pages/ProjectPage'
import Login from './pages/Login'

// import DashBoard from './pages/DashBoard'
const DashBoard = lazy(() => import('./pages/DashBoard'))

function App() {
  // eslint-disable-next-line
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const res = await axios.get('/api/projects')
    setProjects(res.data.projects)
    document.title = 'Christopher Bowers'
  }

  useEffect(() => {
    getProjects()
  }, [])


  const showNav = () => {
    if (window.location.pathname === '/dashboard'  || window.location.pathname === '/login') {
      return null
    } else {
     return ( <Nav projects={ projects }/> )
    }
  }

  const showHeader = () => {
    if (window.location.pathname === '/dashboard' || window.location.pathname === '/login') {
      return null
    } else {
     return ( <Header /> )
    }
  }

  return (
    <div className="App">
      { showHeader() }
      <div className="project-flex-container">
      { showNav() }
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/projects/:slug" element={ <ProjectPage /> }/>
          <Route path="/login" element={ <Login /> }/>
            <Route path="/dashboard" element={ <DashBoard /> }>
            </Route>
        </Routes>
        </Suspense>
    </div>

      <Footer />

    </div>
  );
}

export default App;
