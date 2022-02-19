export default function DeleteProject() {

  return (
    <div className="form-container">
      <form onSubmit={ handleSubmit } >
        <label>Delete Project: </label>
        <select name="title">
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
