import { useState, useEffect, Suspense, lazy } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'

const LayoutsWithNavbar = lazy(() => import('./components/LayoutsWithNavbar'))

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  // eslint-disable-next-line
  const navigate = useNavigate()

  return (
    <div className="App">
      <Suspense fallback={<>loading...</>}>
        <Routes>
          <Route path="/" element={ <LayoutsWithNavbar /> }>
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
