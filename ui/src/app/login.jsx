import React from 'react'
import { Link } from 'react-router'
import Auth from './auth.jsx'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: Auth.isLoggedIn(),
      error: "",
      success: "",
    }

    // ES6 not auto bind this
    this.login = this.login.bind(this)
  }

  render() {
    return(
      <div className="container">

        <form className="form-login">
          <input 
            ref="email"
            type="email" 
            className="form-control input-lg email" 
            placeholder="Email address" 
            required 
            autofocus
          />
          <input 
            ref="password"
            type="password" 
            className="form-control input-lg password" 
            placeholder="Password" 
            required
          />
          <div className="checkbox hidden">
            <label>
              <input 
                ref="remember"
                type="checkbox" 
                defaultChecked="checked"
              /> Remember me
            </label>
          </div>

          {
            this.state.error != "" ? (
              <div className="alert alert-danger text-center" role="alert">
                Login Failed
              </div>
            ) : ""
          }

          {
            this.state.success != "" ? (
              <div className="alert alert-success text-center" role="alert">
                Login Successfully
              </div>
            ) : ""
          }

          <button onClick={ this.login } className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        </form>

        <Link to="/register" className="btn btn-link btn-block" type="button">Register now!</Link>
      </div> // .container
    )
  }

  login(e) {
    e.preventDefault()
    
    let _data = {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value,
      // remember: React.findDOMNode(this.refs.remember).checked
    }

    // TODO validate input
    
    Auth.login(_data, ()=>{
        this.setState({
          success: true
        })
      }.bind(this), ()=>{
        this.setState({
          error: true
        })
      }.bind(this)
    )
  }
}

export default Login