import React from 'react/addons'
import Auth from './auth.jsx'
import jQuery from 'jquery'
import Config from './config.jsx'
import Router from 'react-router'

var Account = React.createClass({
  mixins: [ Router.Navigation, React.addons.LinkedStateMixin ],

  getInitialState() {
    return {
      displayName: null,
      email: null,
      initialStates: {
        displayName: null,
        email: null,
      },
    }
  },

  componentDidMount() {
    jQuery.ajax({
      url: `${Config.apiUrl}/user/1`,
      success: (resp) => {
        this.setState({
          displayName: resp.DisplayName,
          email: resp.Email,

          // Backup for reset btn
          initialStates: {
            displayName: resp.DisplayName,
            email: resp.Email
          }
        })
      },
      error: (resp) => {
        console.log('error');
      }
    })
  },

  render() {
    if (!Auth.isLoggedIn()) {
      this.transitionTo('/')
      return <div />
    }

    let _displayName = this.state.displayName
    let _email = this.state.email

    return (
      <div>
        <input 
          type="text" 
          ref="displayName"
          valueLink={ this.linkState('displayName') }
        />
        <br />
        <input 
          type="text" 
          ref="email"
          valueLink={ this.linkState('email') }
        />
      </div>
    )
  },

  handleUpdate() {

  }

})

export default Account