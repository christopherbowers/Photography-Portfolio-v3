import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'


export default function Footer(props) {

  let button

  if (props.isLoggedIn) {
    button = <LogoutButton onClick={ props.handleLogoutClick } />
  } else {
    button = <LoginButton onClick={ props.handleLoginClick } />
  }

  return (
    <footer>
      <p>This site is built with the <a href="https://www.mongodb.com">M</a><a href="http://expressjs.com">E</a><a href="https://reactjs.org">R</a><a href="https://node.js">N</a> stack and hosted on <a href="https://heroku.com">Heroku</a>. The source code is hosted on <a href="https://github.com/christopherbowers/Photography-Portfolio-v2">Github</a>.</p>
      <div>
      </div>
    </footer>
  )
}

