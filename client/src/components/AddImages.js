import { useState } from 'react'
import axios from 'axios'

export default function AddImages() {

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  console.log(result)
  return result.data
}

  
  
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  
  return (
  
    <div className="form-container">
      {/*<form onSubmit={ props.handleSubmitImage } >
        <label>Add Image: </label>
        <select onChange={ props.handleChange } name="title">
              <option>Select Project:</option>
          {
            props.projects.map((project) => (
              <option key={ project._id } >{ project.title }</option>
            ))
          }
        </select>
       
        <input type="text" name="image_title" onChange={ props.handleChange } placeholder="Image Title" />
        <input type="text" name="year" onChange={ props.handleChange } placeholder="Year"  />
        
        
        <input type="file" name="file" onChange={ props.handleChange } />
        
        
        <button type="submit">Add</button>
      </form>*/}
      
      
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Add</button>
      </form>
       
      
      
      
    </div>
  )
}
