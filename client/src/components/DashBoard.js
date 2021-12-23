import AddProject from './AddProject'
import DeleteProject from './DeleteProject'
import AddImage from './AddImage'
import DeleteImages from './DeleteImages'

export default function DashBoard(props) {
  return (
    <div className="dashboard-container">
      <AddProject {...props} />
      <DeleteProject {...props} />
      <AddImage {...props} />
      {/*<DeleteImages {...props} />*/}
    </div>
  )
}