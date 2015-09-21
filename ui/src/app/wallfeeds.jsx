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
      <div>
        <h1>WallFeeds</h1>
        <Upload />
        <Photos photos={ this.state.photos } />
      </div>
    )
  }

}

export default WallFeeds