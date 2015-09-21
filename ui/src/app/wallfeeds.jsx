import React from 'react'
import jQuery from 'jquery'
import Config from './config.jsx'
import Moment from 'moment'
import Auth from './auth.jsx'

class Comments extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var comments = this.props.comments

    if (!comments) {
      return (<span></span>)
    }

    return (
      <ul className="list-group">
      {
        comments.map((comment) => {
          return (
            <li key={ comment.Id } className="list-group-item">
              { comment.Content }<br />
              <span className="text-muted">
                { Moment(comment.CreatedAt).fromNow() } by { comment.User.DisplayName  }
              </span>
            </li>
          )
        })
      }
      </ul>
    )
  }
}

class Photo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: this.props.photo
    }
    this.post = this.post.bind(this)
  }

  render() {
    var photo = this.state.photo
    return(
      <div className="card" key={ photo.Id }>
        <figure className="figure">
          <img className="img-responsive img-rounded" src={  photo.Url } alt="" />
          <figcaption className="figure-caption">
            { Moment(photo.CreatedAt).fromNow() } by { photo.User.DisplayName }
            <br />
            <span className="label label-info">Tags</span> <span className="label label-info">Tags</span> <span className="label label-info">Tags</span></figcaption>
        </figure>

        <Comments comments={ photo.Comments } />
        
        <form onSubmit={ this.post } >
          <input className="formControl" type="text" ref="content" />
        </form>
      </div>
    )
  }

  post(e) {
    e.preventDefault()

    var id = this.state.photo.Id
    var $input = React.findDOMNode(this.refs.content)
    var content = $input.value
    var token = Auth.getToken()

    jQuery.ajax({
      url: `${Config.apiUrl}/photo/${ id }/comment`,
      method: 'POST',
      data: {
        content: content,
        token: token
      },
      success: (resp) => {
        jQuery($input).val('')
        this.state.photo.Comments.push(resp)
        this.forceUpdate()
      }.bind(this)
    })
  }
}

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
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 col-md-push-3">
      {
        this.state.photos.map((photo) => {
          return <Photo key={ photo.Id } photo={ photo } />
        })
      }
      </div>
      </div>
      </div>
    )
  }

}

export default WallFeeds