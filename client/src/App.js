import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const Home = lazy(() => import('./pages/Home'))
const LayoutsWithNavbar = lazy(() => import('./components/LayoutsWithNavbar'))
const LayoutsWithDashboardNav = lazy(() => import('./components/LayoutsWithDashboardNav'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const AddProject = lazy(() => import('./components/AddProject'))
const DeleteProject = lazy(() => import('./components/DeleteProject'))

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<>loading...</>}>
        <Routes>
          <Route path="/" element={ <LayoutsWithNavbar /> }>
            <Route path="/" element={ <Home /> } />
            <Route path="/projects/:slug" element={ <ProjectPage /> }/>
          </Route>
          <Route path="/login" element={ <Login /> }/>

          <Route path="/dashboard" element={ <LayoutsWithDashboardNav /> }>
            <Route path="/dashboard" element={ <Dashboard /> } />
            <Route path="addproject" element={ <AddProject /> } />
            <Route path="deleteproject" element={ <DeleteProject /> } />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}
