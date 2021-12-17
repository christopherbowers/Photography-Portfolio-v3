import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './components/Home'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'

function App() {


  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const res = await axios.get('http://localhost:3001/api/projects')
    setProjects(res.data.projects)
//     console.log(res.data.projects)
  }
  
  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="App">
      <Header />
      <section>
        <Nav projects={ projects } />
      </section>
      
      <section>
        <Routes>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/projects/:title" element={ <ProjectPage projects={ projects } /> } />
        </Routes>
      </section>
      
      <footer>
        <Footer />
      </footer>
      
    </div>
  );
}

export default App;