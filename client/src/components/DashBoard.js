import AddProject from './AddProject'
import AddImages from './AddImages'

export default function DashBoard(props) {
  return (
    <div>
      <AddProject {...props} />
      <br />
      <AddImages {...props} />
    </div>
  )
}