import React from 'react'
import { Link } from 'react-router'
import Auth from './auth.jsx'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: Auth.isLoggedIn()
    }

    // ES6 not auto bind this
    this.login = this.login.bind(this)
  }

  render() {
    return(
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input 
            ref="email"
            type="email" 
            id="inputEmail" 
            className="form-control" 
            placeholder="Email address" 
            required 
            autofocus
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input 
            ref="password"
            type="password" 
            id="inputPassword" 
            className="form-control" 
            placeholder="Password" 
            required
          />
          <div className="checkbox">
            <label>
              <input 
                ref="remember"
                type="checkbox" 
                defaultChecked="checked"
              /> Remember me
            </label>
          </div>

          <button onClick={ this.login } className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        </form>

        <hr />

        <Link to="/register" className="btn btn-lg btn-link btn-block" type="button">Register</Link>
      </div>
    )
  }

  login(e) {
    e.preventDefault()
    
    let _data = {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value,
      remember: React.findDOMNode(this.refs.remember).checked
    }

    // TODO validate input
    
    Auth.login(_data)
  }
}

export default Login