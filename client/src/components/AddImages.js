// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import axios from 'axios'

export default function AddImages(props) {
  
  return (
    <div>
      <form onSubmit={ props.handleSubmitImage } >
        <label>Add Image: </label>
        {/*<select onChange={ props.handleChange } name="title">
          {
            props.projects.map((project) => (
              <option key={ project._id } >{ project.title }</option>
            ))
          }
        </select>*/}
        <input type="text" name="title" onChange={ props.handleChange } placeholder="Project Title" />
        <input type="text" name="image_title" onChange={ props.handleChange } placeholder="Image Title" />
        <input type="text" name="year" onChange={ props.handleChange } placeholder="Year"  />
        
        
        {/*<input type="file" name="file" onChange={ props.handleChange } />*/}
        
        
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
