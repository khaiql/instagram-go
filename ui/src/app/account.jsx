import React from 'react/addons'
import Auth from './auth.jsx'
import jQuery from 'jquery'
import Config from './config.jsx'
import Router from 'react-router'
import Photos from './photos.jsx'

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
      photos: [],
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

    jQuery.ajax({
      url: `${Config.apiUrl}/user/${ Auth.getId() }/photos`,
      success: (resp) => {
        this.state.photos =
          this.state.photos.concat(resp)
        this.forceUpdate()
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
      <div className="container">
      <div className="row">
      <br /><br />
      <div className="col-sm-4">
        <h4 className="text-center text-muted">Your account</h4>
      <div className="card">
      <div className="card-block">
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

        <fieldset className="form-group">
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

      <div className="col-sm-8">
        <h4 className="card-title text-center text-muted">Your Photos</h4>
        <Photos photos={ this.state.photos } />
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