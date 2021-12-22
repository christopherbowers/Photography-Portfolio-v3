import AddProject from './AddProject'
import DeleteProject from './DeleteProject'
import AddImages from './AddImages'
import DeleteImages from './DeleteImages'

export default function DashBoard(props) {
  return (
    <div className="dashboard-container">
      <AddProject {...props} />
      <DeleteProject {...props} />
      <AddImages {...props} />
      {/*<DeleteImages {...props} />*/}
    </div>
  )
}