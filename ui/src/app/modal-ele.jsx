import React from 'react'
import Modal from './bootstrap/modal.jsx'
import jQuery from 'jquery'

class ModalEle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal fade" id="myModal"aria-hidden="true">
      <div className="modal-dialog">
      <div className="modal-content">
      {
        this.props.title ? (
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">{ this.props.title }</h4>
          </div>
        ) : ''
      }
        <div className="modal-body">
          { this.props.content }
        </div>
      </div>
      </div>
      </div>
    )
  }

  show() {
    jQuery("#myModal").modal("show")
  }
}

export default ModalEle