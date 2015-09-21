import React from 'react'
import Moment from 'moment'
import jQuery from 'jquery'
import Config from './config.jsx'
import Auth from './auth.jsx'
import { Link } from 'react-router'

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

class Hashtags extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return this.props.hashtags ? (
      <div>
      {
        this.props.hashtags.map((hashtag) => {
          return (
            <Link to={ "/tag/" + hashtag.Name } key={ hashtag.Id } className="label label-info">
              #{ hashtag.Name }
            </Link>
          )
        })
      }
      </div>
    ) : (<span></span>)
  }
}

class Photo extends React.Component {
  constructor(props) {
    super(props)
    this.post = this.post.bind(this)
  }

  render() {
    var photo = this.props.photo
    return(
      <div className="card" key={ photo.Id }>
        <figure className="figure">
          <img className="img-responsive img-rounded" src={  photo.Url } alt="" />
          <figcaption className="figure-caption">
            { Moment(photo.CreatedAt).fromNow() } by { photo.User.DisplayName }
            <br />
            <Hashtags hashtags={ photo.Hashtags } />
          </figcaption>
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

    var id = this.props.photo.Id
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
        this.props.photo.Comments.push(resp)
        this.forceUpdate()
      }.bind(this)
    })
  }
}

class Photos extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="container">
      <div className="row">
      <div className="col-md-6 col-md-push-3">
      {
        this.props.photos.map((photo) => {
          return <Photo key={ photo.Id } photo={ photo } />
        })
      }
      </div>
      </div>
      </div>
    )
  }
}

export default Photos