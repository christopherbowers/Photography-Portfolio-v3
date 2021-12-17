import ProjectNav from './ProjectNav'

export default function Nav(props) {

  return (
  
    <ul>
      {
        props.projects.map((project) => (
          <ProjectNav 
            key={ project._id }
            title={ project.title }
          />
        ))
      }
    </ul>
    
  )
}