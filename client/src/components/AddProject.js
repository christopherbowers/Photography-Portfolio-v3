import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import slugify from 'slugify'

export default function AddProject() {
  // const navigate = useNavigate()
  const [projectTitle, setProjectTitle] = useState('')

  const handleSubmitProject = async (e) => {
    e.preventDefault()
    await axios
      .post(`/api/projects`, {
        title: projectTitle,
        slug: slugify(projectTitle).toLowerCase()
      })
      .then(() => {
        setProjectTitle('')
        alert('Project Added')
        // navigate("/dashboard")
      }).catch(error => error.message)
  }

  return (
    <div className="form-container">
      <form onSubmit={ handleSubmitProject } >
        <label>Add Project: </label>
        <input type="text" onChange={(e) => setProjectTitle(e.target.value) } placeholder="Project Title" value={projectTitle} />
        <button disabled={!projectTitle} type="submit">Add</button>
      </form>
    </div>
  )
}
