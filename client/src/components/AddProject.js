export default function AddProject(props) {

  return (
    <div className="form-container">
      <form onSubmit={ props.handleSubmitProject } >
        <label>Add Project: </label>
        <input type="text" onChange={ props.handleChange } placeholder="Project Title" name="title" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
