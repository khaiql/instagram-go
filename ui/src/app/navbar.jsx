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
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#/">[SSS Photos]</a>

        <div className="pull-right">
        { 
          this.state.isLoggedIn ? (
            <div className="pull-right">
              Hello <Link to="/account">{ this.state.displayName }</Link> | <span onClick={ this.handleLogout }>Logout</span>
            </div>
          ) : '' 
        }
        
        {
          this.state.isLoggedIn ? (
            <form 
              style={{ margin: 0 + 'px' }} 
              className="form-inline navbar-form"
              onSubmit={ this.search }
            >
              <input ref="search" className="form-control" type="text" placeholder="Search by tag" />
            </form>
          ) : ''
        }
        </div>

      </nav>
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