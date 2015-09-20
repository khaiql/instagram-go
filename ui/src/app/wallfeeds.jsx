import React from 'react'
import jQuery from 'jquery'
import Config from './config.jsx'
import Moment from 'moment'

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
      }
    })
  }

  render() {
    var _photos = this.state.photos.map((photo) => {
      var _comments = (<div></div>)
      if (photo.Comments) {
        _comments = photo.Comments.map((comment) => {
          return (<li key={ comment.Id } className="list-group-item">{ comment.Content }</li>)
        })
      }

      return(
        <div className="card" key={ photo.Id }>
          
          <figure className="figure">
            <img className="img-responsive img-rounded" src={  photo.Url } alt="" />
            <figcaption className="figure-caption">
              { Moment(photo.CreatedAt).fromNow() } | <span className="label label-info">Tags</span> <span className="label label-info">Tags</span> <span className="label label-info">Tags</span></figcaption>
          </figure>

          <ul className="list-group">
          { _comments }
          </ul>
          
          <input type="text" ref={`comment-${ photo.Id }`} />

          <button className="btn btn-default" onClick={ this.comment.bind(this, photo.Id) }>Comment</button>
        </div>
      )
    })

    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 col-md-push-3">
        { _photos }
      </div>
      </div>
      </div>
    )
  }

  comment(id) {
    console.log(React.findDOMNode(this.refs[`comment-${id}`]).value)
  }

}

export default WallFeeds