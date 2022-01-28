export default function AddProject(props) {

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
