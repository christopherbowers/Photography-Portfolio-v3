export default function DeleteImages(props) {
  console.log(props.projects[0].image)
  return (
    <div className="form-container">
      <form onSubmit={ props.handleSubmitDeleteProject } >
        <label>Delete Images: </label>
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
