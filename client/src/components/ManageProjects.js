import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ManageProjects() {
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      const res = await axios.get('/api/projects')
      setProjects(res.data.projects)
    }
    getProjects()
  }, [])


  const deleteConfirm = (e) => {
    e.preventDefault()
    console.log(e.target.dataset.id)
    // confirm("Press a button!")
  }

  return (
    <>
    <button onClick={() => navigate(-1)}>Back</button>
    <h2>Projects</h2>
    <div>
      <button onClick={ () => navigate('/dashboard/addproject') }>Add Project</button>
      {projects.map(({_id, title}) => (
        <div key={ _id } >
          <a href={`/dashboard/${_id}::edit`}>{ title }</a>
          <button data-id={_id} onClick={ deleteConfirm }>Edit</button>
          <button data-id={_id} onClick={ deleteConfirm }>Delete</button>
        </div>
      ))}

    </div>
    </>
  )
}
