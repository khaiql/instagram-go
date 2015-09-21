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
    this.upload = this.upload.bind(this)
  }

  render() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop} >
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <button onClick={ this.upload } className="form-control">Upload</button>
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
        console.log(resp);
      }
    })
  }

  upload() {
    jQuery.ajax({
      url: `${Config.apiUrl}/photo`,
      enctype: 'multipart/form-data',
      type: "POST",
      data: {
        file: this.state.file
      },
      success: (resp) => {
        console.log(resp);
      }
    })
  }
}

export default Upload