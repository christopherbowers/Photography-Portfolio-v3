import AddProject from './AddProject'
import AddImages from './AddImages'

export default function DashBoard(props) {
  console.log(props)
  return (
    <div>
      <AddProject {...props} />
      <AddImages {...props} />
    </div>
  )
}