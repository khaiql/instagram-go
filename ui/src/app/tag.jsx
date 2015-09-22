import React from 'react'
import Router from 'react-router'
import jQuery from 'jquery'
import Config from './config.jsx'
import Photos from './photos.jsx'

class Tag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      tag: null
    }
  }

  render() {
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
      <div>
        <br />
        <h1 className="text-center text-muted">#{ this.props.params.tag }</h1>
        <br/>
        <Photos photos={ this.state.photos } />
      </div>
    )
  }
}

export default Tag