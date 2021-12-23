import AddProject from './AddProject'

export default function DashBoard(props) {
  return (
    <div className="dashboard-container">
      <AddProject {...props} />
    </div>
  )
}