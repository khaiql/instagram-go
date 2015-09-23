import React from 'react'
import jQuery from 'jquery'
import Config from './config.jsx'
import Photos from './photos.jsx'
import Upload from './upload.jsx'

class WallFeeds extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    jQuery.ajax({
      url: `${ Config.apiUrl }/photos`,
      success: (resp) => {
        this.state.photos =
          this.state.photos.concat(resp)
        this.forceUpdate()
      }.bind(this)
    })
  }

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 col-md-push-3">
        <br />
        
        <Upload unshiftPhoto={ this.unshiftPhoto.bind(this) } />

        <Photos photos={ this.state.photos } />
      </div>
      </div>
      </div>
    )
  }

  unshiftPhoto(photo) {
    this.state.photos.unshift(photo)
    this.forceUpdate()
  }

}

export default WallFeeds