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
      url: `${Config.apiUrl}/user/${ Auth.getId() }`,
      success: (resp) => {
        this.setState({
          displayName: resp.DisplayName,
          email: resp.Email.String,

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
      <div className="container account-page">
      <div className="card">
      <div className="card-block">
        <h4 className="card-title text-center text-muted">Your account</h4>
        <br />

        <form>
        <fieldset className="form-group">
          <input 
            className="form-control input-lg"
            type="text" 
            ref="displayName"
            valueLink={ this.linkState('displayName') }
          />
        </fieldset>

        <fieldset className="form-group">
          <input 
            className="form-control input-lg"
            type="text" 
            ref="email"
            valueLink={ this.linkState('email') }
          />
        </fieldset>

        <fieldset class="form-group">
          <button
            onClick={ this.update } 
            className="btn btn-lg btn-primary btn-block" 
            type="submit"
          >Update</button>
        </fieldset>
        </form>
      </div>
      </div>
      </div>
    )
  },

  update(e) {
    e.preventDefault()

    var _data = {
      displayName: React.findDOMNode(this.refs.displayName).value,
      email: React.findDOMNode(this.refs.email).value
    }

    jQuery.ajax({
      url: `${Config.apiUrl}/user/${ Auth.getId() }`,
      method: 'POST',
      data: _data,
      success: (resp) => {
        alert("Update successfully")
        Auth.setDisplayName(_data.displayName)
        location.reload()
      },
      error: (jqXHR, textStatus, errorThrown) => {
        alert(jqXHR.responseJSON.Message)
      }
    })
  }

})

export default Account