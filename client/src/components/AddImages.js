// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import axios from 'axios'

export default function AddImages(props) {
  console.log(props.projects)
  return (
    <div>
      <form onSubmit={ props.handleSubmit } >
        <label>Add Image:</label>
        <select name="project">
          {
            props.projects.map((project) => (
              <option key={ project._id }>{ project.title }</option>
            ))
          }
        </select>
        <input type="text" onChange={ props.handleChange } placeholder="Image Title" name="title" />
        <input type="text" onChange={ props.handleChange } placeholder="Year" name="year" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
