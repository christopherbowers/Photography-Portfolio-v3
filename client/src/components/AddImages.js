import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddImages(props) {

  const {slug} = useParams()
  let navigate = useNavigate()

  async function postImage({image}) {
    const formData = new FormData();
    formData.append("image", image)

    const result = await axios.post('/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }

  const [file, setFile] = useState()

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  const submit = async (e) => {
    e.preventDefault()
    await postImage({image: file})

    await axios
      .post(`/api/images`, {
        image_title: e.target.title.value,
        year: e.target.year.value,
        image_url: '/images/' + (file.name).replaceAll(/[\s*+~()'"!:@]/g, '-').toLowerCase(),
        project_id: slug
    })
      props.getProject()
  }


  const submitDeleteProject = async (e) => {
    e.preventDefault()
    await axios.delete(`/api/projects/${slug}`)
    props.getProjects()
    navigate("/")
  }

  const submitUpdateProject = async (e) => {
    e.preventDefault()
    axios.put(`/api/projects/${slug}`, {
      title: e.target.title.value
    })
    props.getProject()
  }

  const isLoggedIn = props.isLoggedIn


  if (isLoggedIn) {

  return (

    <div className="form-container">

      <form onSubmit={ submit } >
        <label>Add Image: </label>
        <input onChange={ fileSelected } type="file" accept="image/*"></input>
        <input name="title" type="text" placeholder="Image Title" />
        <input name="year" type="text" placeholder="Year" />
        <button type="submit"style={{backgroundColor: "green", color: "white", borderColor: "green"}}>Add</button>
      </form>
      <form onSubmit={ submitDeleteProject } >
        <label>Delete Project: </label>
        <button type="submit" style={{backgroundColor: "red", color: "white", borderColor: "red"}}>Delete</button>
      </form>
      <form onSubmit={ submitUpdateProject } >
        <label>Change Project Title: </label>
        <input type="text" placeholder="New Project Title" name="title" />
        <button type="submit">Update</button>
      </form>
    </div>

  )
}

 return (
    <div></div>
  )
}
