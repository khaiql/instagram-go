import React from 'react'
import { Navigation } from 'react-router'
import jQuery from 'jquery'
import Config from './config.jsx'
import Photos from './photos.jsx'
import Auth from './auth.jsx'

var Tag = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      photos: [],
      tag: null
    }
  },

  render() {
    if (!Auth.isLoggedIn()) {
      this.transitionTo('/')
      return <div />
    }

    var tag = this.props.params.tag

    if (tag !== this.state.tag) {
      jQuery.ajax({
        url: `${Config.apiUrl}/photos?tag=${ tag }`,
        success: (resp) => {
          this.setState({
            tag: tag,
            photos: resp
          })
        }.bind(this)
      })
    }

    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 col-md-push-3">
        <br />

        <h1 className="text-center text-muted">#{ this.props.params.tag }</h1>
        <br/>
        <Photos photos={ this.state.photos } />
        
      </div>
      </div>
      </div>
    )
  }
})

export default Tag