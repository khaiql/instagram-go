import React from 'react'
import Router from 'react-router'
import Config from './config.jsx'
import jQuery from 'jquery'
import Auth from './auth.jsx'

var Register = React.createClass({
  mixins: [ Router.Navigation ],

  render() {
    if (Auth.isLoggedIn()) {
      this.transitionTo('/')
      return <div />
    }

    return (
      <div className="container">
        <form className="form-register">
          <h2>Register</h2>
          <label htmlFor="inputName" className="sr-only">Display Name</label>
          <input 
            ref="displayName"
            type="text" 
            id="inputName" 
            className="form-control"
            placeholder="Display Name"
            required
            autofocus
          />

          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input 
            ref="email"
            type="email" 
            id="inputEmail" 
            className="form-control"
            placeholder="Email"
            required
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

          <button
            onClick={ this.register } 
            className="btn btn-lg btn-primary btn-block" 
            type="submit"
          >Register</button>
        </form>
      </div>
    )
  },

  register(e) {
    e.preventDefault()

    let _data = {
      displayName: React.findDOMNode(this.refs.displayName).value,
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value
    }

    jQuery.ajax({
      url: `${Config.apiUrl}/user/register`,
      data: _data,
      success: (resp) => {
        Auth.setToken(resp.token)
        this.transitionTo('/')
        return location.reload()
      },
      error: (resp) => {
        alert('Register failed')
      }
    })
  }

})

export default Register