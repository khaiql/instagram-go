import React from 'react'
import Auth from './auth.jsx'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: Auth.isLoggedIn()
    }
  }

  setIsLoggedIn(isLoggedIn) {
    this.setState({
      isLoggedIn: isLoggedIn
    })
  }

  handleLogout() {
    Auth.logout()
  }

  render() {
    return(
      <div className="container">
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#/">[SSS Photos]</a>

        <div className="pull-right">
        { 
          this.state.isLoggedIn ? (
            <div className="pull-right">
              Hello Tri | <span onClick={ this.handleLogout }>Logout</span>
            </div>
          ) : '' 
        }
          
          <form 
            style={{ margin: 0 + 'px' }} 
            className="form-inline navbar-form" 
            _lpchecked="1"
          >
            <input className="form-control" type="text" placeholder="Search" />
            <button className="btn btn-secondary-outline" type="submit">Search</button>
          </form>
        </div>

      </nav>
      </div>
    )
  }
}

export default Navbar