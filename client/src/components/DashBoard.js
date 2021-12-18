import AddProject from './AddProject'
import DeleteProject from './DeleteProject'
import AddImages from './AddImages'

export default function DashBoard(props) {
  return (
    <div>
      <AddProject {...props} />
      <DeleteProject {...props} />
      <br />
      <AddImages {...props} />
    </div>
  )
}