import AddProject from './AddProject'
import DeleteProject from './DeleteProject'
import AddImages from './AddImages'

export default function DashBoard(props) {
  return (
    <div className="dashboard-container">
      <AddProject {...props} />
    </div>
  )
}