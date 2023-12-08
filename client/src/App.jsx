import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import Loading from './components/Loading'
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const Home = lazy(() => import('./pages/Home'))
const LayoutWithNavbar = lazy(() => import('./layouts/LayoutWithNavbar'))
const LayoutWithDashboardNav = lazy(() => import('./layouts/LayoutWithDashboardNav'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const AddProject = lazy(() => import('./components/AddProject'))
const ManageProjects = lazy(() => import('./components/ManageProjects'))

export default function App() {
  return (
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<>Not Found</>} />
          <Route path='/' element={<LayoutWithNavbar />}>
            <Route path='/' element={<Home />} />
            <Route path='/projects/:slug' element={<ProjectPage />} />
          </Route>
          <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={<LayoutWithDashboardNav />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='addproject' element={<AddProject />} />
            <Route path='projects' element={<ManageProjects />} />
          </Route>
        </Routes>
      </Suspense>
  )
}
