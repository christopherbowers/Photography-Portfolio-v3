import { useState, useEffect, Suspense, lazy } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ProjectPage from './pages/ProjectPage'
import LayoutsWithNavbar from './components/LayoutsWithNavbar'

const Login = lazy(() => import ('./pages/Login'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))

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
        <Suspense fallback={<>loading...</>}>
          <Routes>

          <Route path="/" element={ <LayoutsWithNavbar projects={ projects } /> }>
              <Route path="/" element={ <Home /> } />
              <Route path="/projects/:slug" element={ <ProjectPage /> }/>
          </Route>

          <Route path="/login" element={ <Login /> }/>
          <Route path="/dashboard" element={ <Dashboard /> } />

          </Routes>
        </Suspense>
    </div>

  );
}

export default App;
