import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export default function Login(props) {

  let button
  
  if (props.isLoggedIn) {
    button = <LogoutButton onClick={ props.handleLogoutClick } />
  } else {
    button = <LoginButton onClick={ props.handleLoginClick } />
  }
  
//   <h1>Login Page</h1>
  return (
    <div>
      { button }
    </div>
  )  
  
}