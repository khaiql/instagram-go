import React from 'react'
import { Link, Navigation } from 'react-router'
import Config from './config.jsx'
import jQuery from 'jquery'
import Auth from './auth.jsx'

var Register = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      error: "",
      success: false
    }
  },

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

          {
            this.state.error != "" ? (
              <div className="alert alert-danger text-center" role="alert">
                { this.state.error }
              </div>
            ) : ""
          }

          {
            this.state.success != "" ? (
              <div className="alert alert-success text-center" role="alert">
                Register Successfully
              </div>
            ) : ""
          }

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

    if (!_data.displayName || !_data.email || !_data.password) {

      this.setState({
        error: "Missing some fields"
      })

      return
    }

    jQuery.ajax({
      url: `${Config.apiUrl}/user`,
      method: 'POST',
      data: _data,
      success: (resp) => {
        this.setState({
          success: true
        })
        
        Auth.setToken(resp.Token)
        Auth.setDisplayName(resp.DisplayName)
        Auth.setId(resp.Id)

        setTimeout(()=>{
          // this.transitionTo('/')
          location.reload()
        }.bind(this), 1000)
      },
      error: (jqXHR, textStatus, errorThrown) => {
        // alert(jqXHR.responseJSON.Message)
        this.setState({
          error: "Email existed"
        })
      }.bind(this)
    })
  }

})

export default Register