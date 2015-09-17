import React from 'react'
import { Link } from 'react-router'
import jQuery from 'jquery'
import Config from './config.jsx'
import cookie from 'react-cookie'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      remember: true
    }

    // ES6 not auto bind this
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  render() {
    return(
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input 
            type="email" 
            id="inputEmail" 
            className="form-control" 
            placeholder="Email address" 
            required 
            autofocus 
            name="email"
            onChange={ this.handleChange } 
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input 
            type="password" 
            id="inputPassword" 
            className="form-control" 
            placeholder="Password" 
            required 
            name="password"
            onChange={ this.handleChange }
          />
          <div className="checkbox">
            <label>
              <input 
                type="checkbox" 
                defaultChecked={ this.state.remember }
                name="remember"
                onChange={ this.handleChange }
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

  handleChange(e) {
    let nextState = {}
    if (e.target.type === 'checkbox') {
      nextState[e.target.name] = e.target.checked
    } else {
      nextState[e.target.name] = e.target.value
    }
    this.setState(nextState)
  }

  login(e) {
    e.preventDefault()

    jQuery.ajax({
      url: `${Config.apiUrl}/user/login`,
      data: this.state,
      success: (data) => {
        console.log(data);
      },
      error: (data)=> {
        console.log(data);
      }
    })
  }

  // componentDidMount() {
  //   jQuery.ajax({
  //     url: "https://api.github.com/users/octocat/gists",
  //     success: (data) => {
  //       console.log(data)
  //       console.log(React.findDOMNode(this));
  //     }
  //   })
  // }
}

export default Login