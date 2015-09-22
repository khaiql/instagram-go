import React from 'react'
import Auth from './auth.jsx'
import { Navigation, Link } from 'react-router'
import jQuery from 'jquery'

var Navbar = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      isLoggedIn: Auth.isLoggedIn(),
      displayName: Auth.getDisplayName()
    }
  },

  setIsLoggedIn(isLoggedIn) {
    this.setState({
      isLoggedIn: isLoggedIn
    })
  },

  handleLogout() {
    Auth.logout()
  },

  render() {
    return(
      <div className="container">
      <div className="row">
      <nav className="navbar clearfix navbar-light bg-faded">
        <div className="col-sm-3">
          <a className="navbar-brand" href="#/"><img width="90" src="/styles/images/logo.png" alt=""/></a>
        </div>

        { 
          this.state.isLoggedIn ? (
            <div className="col-sm-6">
              <form 
                style={{ margin: 0 + 'px' }} 
                className="navbar-form"
                onSubmit={ this.search }
              >
                <input ref="search" className="form-control" type="text" placeholder="Search by tag" />
              </form>
            </div>
          ) : ''
        }
        {
          this.state.isLoggedIn ? (
            <div className="col-sm-3 text-right">
              Hello <Link to="/account">{ this.state.displayName }</Link> | <a href="javascript:;" onClick={ this.handleLogout }>Logout</a>
            </div>
          ) : '' 
        }

      </nav>
      </div>
      </div>
    )
  },

  search(e) {
    e.preventDefault()
    var $input = jQuery(React.findDOMNode(this.refs.search))
    var tag = $input.val()
    $input.val('')
    this.transitionTo(`/tag/${ tag }`)
  }
})

export default Navbar