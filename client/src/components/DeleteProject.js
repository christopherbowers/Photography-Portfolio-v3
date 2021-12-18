export default function DeleteProject(props) {
  
  return (
    <div>
      <form onSubmit={ props.handleSubmitDeleteProject } >
        <label>Delete Project: </label>
        <select onChange={ props.handleChange } name="title">
          <option>Select Project:</option>
          {
            props.projects.map((project) => (
              <option key={ project._id } >{ project.title }</option>
            ))
          }
        </select>
        <button type="submit">Delete</button>
      </form>
    </div>
  )
}
