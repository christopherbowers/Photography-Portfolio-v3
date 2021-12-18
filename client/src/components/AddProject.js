// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import axios from 'axios'

export default function AddProject(props) {
  
  return (
    <div>
      <form onSubmit={ props.handleSubmit } >
        <label>Add Project:</label>
        <input type="text" onChange={ props.handleChange } placeholder="Project Title" name="title" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
