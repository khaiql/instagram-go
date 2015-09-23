import React from 'react'
import { Link, Navigation } from 'react-router'
import Config from './config.jsx'
import jQuery from 'jquery'
import Auth from './auth.jsx'

var Register = React.createClass({
  mixins: [ Navigation ],

  render() {
    if (Auth.isLoggedIn()) {
      this.transitionTo('/')
      return <div />
    }

    return (
      <div className="container">
        <form className="form-register">
          <input 
            ref="displayName"
            type="text" 
            className="form-control input-lg display-name"
            placeholder="Display Name"
            required
            autofocus
          />

          <input 
            ref="email"
            type="email"  
            className="form-control input-lg email"
            placeholder="Email"
            required
          />

          <input 
            ref="password"
            type="password" 
            className="form-control input-lg password"
            placeholder="Password"
            required
          /> 

          <button
            onClick={ this.register } 
            className="btn btn-lg btn-primary btn-block" 
            type="submit"
          >Register</button>
        </form>

        <Link to="/login" className="btn btn-link btn-block" type="button">Login</Link>
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
      url: `${Config.apiUrl}/user`,
      method: 'POST',
      data: _data,
      success: (resp) => {
        Auth.setToken(resp.Token)
        Auth.setDisplayName(resp.DisplayName)
        Auth.setId(resp.Id)
        this.transitionTo('/')
        return location.reload()
      },
      error: (jqXHR, textStatus, errorThrown) => {
        alert(jqXHR.responseJSON.Message)
      }
    })
  }

})

export default Register