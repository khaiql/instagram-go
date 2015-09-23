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
      <ul className="list-group comment">
      {
        comments.map((comment) => {
          return (
            <li key={ comment.Id } className="list-group-item">
              { comment.Content }<br />
              <span className="text-muted t-tertiary">
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
            <Link to={ "/tag/" + hashtag.Name } key={ hashtag.Id } className="label label-primary">
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
      <div className="card-block">
        <figure className="figure">
          <img className="img-responsive img-rounded" src={  photo.Url } alt="" />
          <figcaption className="figure-caption clearfix">
            { Moment(photo.CreatedAt).fromNow() } by { photo.User.DisplayName }
            <div className="pull-right">
              <Hashtags hashtags={ photo.Hashtags } />
            </div>
          </figcaption>
        </figure>

        <hr />
        
        <form onSubmit={ this.post } >
          <input className="form-control" type="text" ref="content" placeholder="What are you thinking?" />
        </form>

        <Comments comments={ photo.Comments } />
      </div>
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
        if (this.props.photo.Comments == null) {
          this.props.photo.Comments = []
        }
        this.props.photo.Comments.unshift(resp)
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
      <div>
      {
        this.props.photos.map((photo) => {
          return <Photo key={ photo.Id } photo={ photo } />
        })
      }
      </div>
    )
  }
}

export default Photos