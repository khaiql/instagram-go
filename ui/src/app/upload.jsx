import React from 'react'
import jQuery from 'jquery'
import Config from './config.jsx'
import Auth from './auth.jsx'
import Dropzone from 'react-dropzone'

class Upload extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      file: null
    }

    this.onDrop = this.onDrop.bind(this)
  }

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 col-md-push-3 text-center">
        <Dropzone ref="dropzone" onDrop={this.onDrop} >
          <div><br />Drag&Drop<br /> to post you monent</div>
        </Dropzone>
        <br />
        <br />
      </div>
      </div>
      </div>
    )
  }

  onDrop(files) {
    this.setState({
      file: files[0]
    })

    var data = new FormData()
    data.append("file", files[0])
    data.append("token", Auth.getToken())

    jQuery.ajax({
      url: `${Config.apiUrl}/photo`,
      method: 'POST',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: data,
      success: (resp) => {
        this.props.unshiftPhoto(resp)
        // console.log(resp);
        // location.reload()
      }
    })
  }
}

export default Upload